import { Mina, PrivateKey, PublicKey, Field, MerkleMapWitness, MerkleMap, Poseidon } from 'snarkyjs';
import { VotingContract, NullifierProxy } from '../VotingContract.js';

export async function sendVote(
  zkClaim: VotingContract,
  sender: {puk: PublicKey, prk: PrivateKey}, // sender and voter MUST be the same!
  vote: Field,
  nullifier: NullifierProxy
  ) {
  // send the Vote Now
  const TX_FEE = 100_000_000;

  try {
    let tx = await Mina.transaction(
      { sender: sender.puk, fee: TX_FEE }, 
      () => { zkClaim.sendVote(sender.prk, vote, nullifier); }
    );
    await tx.prove();
    tx.sign([sender.prk]);
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
    console.log("helpers sendVote ERROR=", err.toString())
  }
}


export function addElectorsToNullifier(
  claimUid: Field, 
  electors: PublicKey[]
): MerkleMap {
  // initialize a Merkle Map
  let mt = new MerkleMap();
  mt.set(Field(0), Field(0));

  // add electors to Nullifier
  for (let j=0; j < electors.length; j++) {
    let key = NullifierProxy.key(electors[j], claimUid);
    mt.set(key, Field(1)); // assigned
    //console.log("addElectorsToNullifier root=", mt.getRoot().toString(), " key=", key.toString());

    let witness = mt.getWitness(key);
    const [witnessRoot, witnessKey] = witness.computeRootAndKey(
      Field(1) /* WAS ASSIGNED BUT NOT VOTED YET */
    );
    console.log("addElectorsToNullifier witnessRoot=", witnessRoot.toString(), " witnessKey=", witnessKey.toString());
  }

  return mt;  
}


export function getNullifierProxy(
  nullifier: MerkleMap,
  electorPuk: PublicKey,
  claimUid: Field
): NullifierProxy {
  const key = NullifierProxy.key(electorPuk, claimUid);
  return {
    root: nullifier.getRoot(),
    witness: nullifier.getWitness(key)
  }
}
