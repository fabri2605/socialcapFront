import { Mina, PrivateKey, PublicKey, AccountUpdate,} from 'snarkyjs';
import { UID } from "../lib/uid.js";

import { ElectionsContract } from "../ElectionsContract.js";

import { 
  testUpdateTask,
  testUpdateNullifier
} from "./root-tests-helpers-03.js"

let Contract = ElectionsContract;

let proofsEnabled = true;
console.log("Proofs enabled=", proofsEnabled);

let 
  deployerAccount: PublicKey,
  deployerKey: PrivateKey,
  senderAccount: PublicKey,
  senderKey: PrivateKey,
  zkAppAddr: PublicKey,
  zkAppKey: PrivateKey;

// compile Contract
console.log("compiling Contract ...", Contract);
if (proofsEnabled) 
  await Contract.compile();
console.log("compiled !");

// set instance
const Local = Mina.LocalBlockchain({ proofsEnabled });
Mina.setActiveInstance(Local);

// get some accounts
({ privateKey: deployerKey, publicKey: deployerAccount } = Local.testAccounts[0]);
({ privateKey: senderKey, publicKey: senderAccount } = Local.testAccounts[1]);
console.log("deployer Addr=", deployerAccount);
console.log("sender Addr=", senderAccount);

// create zkapp keys and instance 
zkAppKey = PrivateKey.random();
zkAppAddr = zkAppKey.toPublicKey();
let zkApp = new Contract(zkAppAddr);
console.log("zkApp Addr=", zkAppAddr.toBase58());
console.log("zkApp=", zkApp);

// deploy it 
const txn = await Mina.transaction(deployerAccount, () => {
  AccountUpdate.fundNewAccount(deployerAccount);
  zkApp.deploy();
});
await txn.prove();
// this tx needs .sign(), because `deploy()` adds an account update 
// that requires signature authorization
await txn.sign([deployerKey, zkAppKey]).send();
console.log("Deployed")

// testing ElectionsContract now ...

console.log("begin testing contract ... updateTask");
await testUpdateTask(
  zkApp, 
  senderAccount, 
  senderKey
)

console.log("begin testing contract ... updateNullifier");
await testUpdateNullifier(
  zkApp, 
  senderAccount, 
  senderKey
)
