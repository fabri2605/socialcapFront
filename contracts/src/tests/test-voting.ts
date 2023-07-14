import { Mina, PrivateKey, PublicKey, Field, MerkleMapWitness, MerkleMap, Poseidon, Nullifier } from 'snarkyjs';
import { randomInt } from 'crypto';
import { ClaimInstance, ClaimsFactory } from "../services/claims-factory.js";
import { rollupClaims } from "../services/claims-roller.js";

let 
  deployerAccount: PublicKey,
  deployerKey: PrivateKey,
  senderAccount: PublicKey,
  senderKey: PrivateKey;

// set instance
const Local = Mina.LocalBlockchain({ proofsEnabled: true });
Mina.setActiveInstance(Local);

// get some accounts
({ privateKey: deployerKey, publicKey: deployerAccount } = Local.testAccounts[0]);
({ privateKey: senderKey, publicKey: senderAccount } = Local.testAccounts[1]);
console.log("deployer Addr=", deployerAccount);
console.log("sender Addr=", senderAccount);

/// Some auxilary functions ///

let claims: any[] = [];

type NullifierProxy = {
  root: Field, 
  witness: MerkleMapWitness
}

async function newClaim(total: number, positives: number) {
  const uid = randomInt(1000);
  const zkapp = await ClaimsFactory.deploy(
    Field(uid), Field(5), Field(3), 
    deployerAccount, deployerKey
  );
  return {
    uid: Field(uid),
    accountId: zkapp.address.toBase58()
  }
}

function getClaims() {
  return claims;
}

async function getRunningInstances() {
  // simulating a claims arrays
  let running: any[] = [];
  
  let openClaims = getClaims();

  (openClaims || []).forEach(async (t) => {
    let publicKey = PublicKey.fromBase58(t.accountId);
    let instance = await ClaimsFactory.getInstance(publicKey);
    running.push(instance);
  })  
  return running;
}

async function sendVote(
  zkapp: any,
  electorUid: Field,
  vote: Field,
  nullifier: NullifierProxy
  ) {
  // send the Vote Now
  const TX_FEE = 100_000_000;

  try {
    let tx = await Mina.transaction(
      { sender: senderAccount, fee: TX_FEE }, 
      () => { zkapp.sendVote(
        electorUid, Field(1), nullifier
      );}
    );
    await tx.prove();
    tx.sign([senderKey]);
    let pendingTx = await tx.send();

    // check if Tx was success or failed
    if (!pendingTx.isSuccess) {
      console.log('error sending transaction (see above)');
      // process.exit(0); // we will NOT exit here, but retry latter !!!
      // break; 
    }
    console.log(
      `See transaction at https://berkeley.minaexplorer.com/transaction/${pendingTx.hash()}
      Waiting for transaction to be included...`
    );

    // TODO: I am not sure we need to do this or if we can send another transaction
    // while this one is being processed ...
    await pendingTx.wait();
  }
  catch (err: any) {
    console.log("rollingClaims failed on rollup=", err.toString())
  }
}

///// MAIN /////

// first compile it
await ClaimsFactory.compile();

// deploy 3 contracts 
claims[0] = await newClaim(3,2); // the usual case
//claims[1] = await newClaim(15,9);
//claims[2] = await newClaim(5,3);

let running: ClaimInstance[] = await getRunningInstances();

// run the rollups forever ...
// activate every minute
let isRolling = false;
setInterval(async () => {
  if (!isRolling) {
    isRolling = true;

    let running: ClaimInstance[] = await getRunningInstances();

    await rollupClaims(
      running,
      // we should think about who will be the payer here, maybe a special 
      // Socialcap account for this funded on demand ?
      senderAccount, senderKey 
    )

    isRolling = false;
  }
}, (60*1000*1));  

///// VOTING /////

// initialize a Merkle Map
let mt = new MerkleMap();
mt.set(Field(0), Field(0));
const zeroRoot = mt.getRoot();

// add elector to Nullifier
let electorUid = Field(15);
let claimUid = Field(claims[0].uid);
let key = Poseidon.hash([electorUid, claimUid]);
mt.set(key, Field(1)); // assigned

let nullifier = {
  root: mt.getRoot(),
  witness: mt.getWitness(key)
}

//await sendVote(running[0], electorUid, Field(1), nullifier);

