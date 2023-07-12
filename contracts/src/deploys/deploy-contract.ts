import { PrivateKey, PublicKey, Mina, AccountUpdate } from "snarkyjs";
import { ClaimContract } from "../ClaimContract.js";

export { deployClaimContract };

let proofsEnabled = true;

const BERKELEY_URL = 'https://proxy.berkeley.minaexplorer.com/graphql';
const TX_FEE = 100_000_000; // 1.0


// async function setNetwork(network: "Local" | "Berkeley"): Mina {
//   // set instance
//   let instance ;
//   switch (network) {
//     case "Local": instance = Mina.LocalBlockchain({ proofsEnabled }); break;
//     case "Berkeley": instance = Mina.Network(BERKELEY_URL); break
//   }
//   Mina.setActiveInstance(instance);
//   return instance;
// }


async function deployClaimContract(
  deployerAccount: PublicKey,
  deployerKey: PrivateKey
) {
  // compile Contract
  console.log("proofs enabled=", proofsEnabled);
  console.log("compiling Contract ...");
  if (proofsEnabled) await ClaimContract.compile();
  console.log("compiled !");

  const zkAppKey = PrivateKey.random();
  const zkAppAddr = zkAppKey.toPublicKey();
  let zkApp = new ClaimContract(zkAppAddr);
  console.log("zkApp Addr=", zkAppAddr.toBase58());
  console.log("zkApp=", zkApp);
  
  // deploy it 
  const txn = await Mina.transaction(deployerAccount, () => {
    // the deployer account must already be funded or this will fail !!!
    AccountUpdate.fundNewAccount(deployerAccount);
    zkApp.deploy();
  });
  await txn.prove();

  // this tx needs .sign(), because `deploy()` adds an account update 
  // that requires signature authorization
  await txn.sign([deployerKey, zkAppKey]).send();
  console.log("deployed !")

  return zkApp;
}
