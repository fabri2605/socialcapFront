import { PrivateKey, PublicKey, Mina, Field, AccountUpdate, fetchAccount } from "snarkyjs";
import { ClaimContract } from "../ClaimContract.js";
import { randomInt } from "crypto";

export { ClaimsFactory, ClaimInstance };

let proofsEnabled = true;

const ClaimsFactory = {
  compile: compileClaimContract, 
  deploy: deployClaimContract,
  getInstance: getClaimInstance
}

type ClaimInstance = {
  instance: any,
  address: PublicKey,
  secret?: PrivateKey
}


async function compileClaimContract() {
  // compile Contract
  console.log("proofs enabled=", proofsEnabled);
  console.log("compiling Contract ...");
  if (proofsEnabled) await ClaimContract.compile();
  console.log("compiled !");
}


async function deployClaimContract(
  claimUid: Field,
  requiredVotes: Field,
  requiredPositives: Field,
  deployerAccount: PublicKey,
  deployerKey: PrivateKey,
): Promise<ClaimInstance> {
  // we need to generate a new key pair for each deploy !
  const zkAppKey = PrivateKey.random();
  const zkAppAddr = zkAppKey.toPublicKey();
  console.log(`\nzkApp instance address=${zkAppAddr.toBase58()}`);

  let zkApp = new ClaimContract(zkAppAddr);
  console.log("zkApp instance created!");
  
  // deploy it 
  let txn = await Mina.transaction(deployerAccount, () => {
    // IMPORTANT: the deployer account must already be funded 
    // or this will fail miserably ughhh
    AccountUpdate.fundNewAccount(deployerAccount);
    zkApp.deploy();
  });
  await txn.prove();

  // this tx needs .sign(), because `deploy()` adds an account update 
  // that requires signature authorization
  await txn.sign([deployerKey, zkAppKey]).send();
  console.log("zkApp instance deployed !")
  
  // wait for account ...
  await fetchAccount({ publicKey: zkAppAddr });

  // initialize it !
  // we can only call setup() AFTER we are sure the deployed account exists
  // otherwise we have failures when initializing ...
  txn = await Mina.transaction(deployerAccount, () => {
    zkApp.setup(claimUid, requiredVotes, requiredPositives);
  });
  await txn.prove();
  await txn.sign([deployerKey]).send();
  console.log("zkApp instance initialized !")

  // get some value after deploy
  let actionsState = zkApp.actionsState.get(); 
  console.log("zkApp instance actionsState=", actionsState.toString())

  const instance: ClaimInstance = {
    instance: zkApp, 
    address: zkAppAddr, 
    secret: zkAppKey 
  };

  logIt(instance);
  return instance;
}


async function getClaimInstance(
  address: PublicKey
): Promise<ClaimInstance> {
  // we need to create an instance of an already deployed contract
  console.log(`\nzkApp instance address=${address.toBase58()}`);

  let zkApp = new ClaimContract(address);
  console.log("zkApp instance created!");
  
  // get some value after creating just for checking
  let actionsState = zkApp.actionsState.get(); 
  console.log("zkApp instance actionsState=", actionsState.toString())

  const instance: ClaimInstance = {
    instance: zkApp, 
    address: address
  };

  logIt(instance);
  return instance;
}


function logIt(zkapp: any) {
  console.log(
    `instance= ${JSON.stringify(zkapp.instance.account, null, 2)}`
    +`\naddress= ${zkapp.address.toBase58()}`
    +`\nsecret= ${zkapp?.secret?.toBase58() || ''}`  
  );
}
