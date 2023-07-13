import { Mina, Field, PrivateKey, PublicKey } from 'snarkyjs';
import { ClaimInstance } from "./deploy-claims.js";

export { rollupClaims };

const TX_FEE = 100_000_000;


async function rollupClaims(
  running: ClaimInstance[],
  payerAccount: PublicKey,
  payerSecret: PrivateKey
) {
  // VERY NAIVE IMPL just to test running multiple claims 
  // this will not good in prod because of tx fees will escalate. 
  // Would need to use a scheduler instead of this, but anyway
  // fees should only be paid when we have pending votes to process
  // CAUTION: we must be sure about what does reducer.getActions() really
  // returns because it may be misgiding
  for (let j=0; j < running.length; j++) {
    let instance = running[j].instance;

    // first check if finished (result > 0)
    let result: Field = instance.result.get();
    const isFinished = result.greaterThan(Field(0)).toBoolean();
    if (isFinished) {
      // should remove this from the queue 
      continue;
    }

    let claimUid: Field = instance.claimUid.get();
    console.log("rollupVotes running claimUid= ", claimUid.toString());

    // do we have pending votes ?
    let actionsState: Field = instance.actionsState.get();
    let pending = instance.reducer.getActions({
      fromActionState: actionsState,
    });
    console.log("rollupVotes pending votes= ", pending.length);

    // if no pending votes we just go to the next instance ...
    // we run rollup ONLY when we have something to rollup
    //if (pending.length === 0 ) continue;
    
    // we should check here if payer has funds for TX fees
    // ...

    // run the rollup now
    try {
      let tx = await Mina.transaction(
        { sender: payerAccount, fee: TX_FEE }, 
        () => { instance.rollupVotes(); }
      );
      await tx.prove();
      tx.sign([payerSecret]);
      let pendingTx = await tx.send();
  
      // check if Tx was success or failed
      if (!pendingTx.isSuccess) {
        console.log('error sending transaction (see above)');
        // process.exit(0); // we will NOT exit here, but retry latter !!!
        continue; 
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
      console.log("rollupVotes failed on rollup=", err.toString())
    }
  }
}
