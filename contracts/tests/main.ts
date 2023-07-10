import { Mina, PrivateKey, PublicKey, AccountUpdate,} from 'snarkyjs';
import { UID } from "../src/lib/uid.js";

import { SocialcapContract } from "../src/SocialcapContract.js";

import { 
  testUpdateCommunity, 
  testUpdatePerson, 
  testUpdateMember 
} from "./test-contract.js"

let Contract = SocialcapContract;

let proofsEnabled = true;
console.log("Proofs enabled=", proofsEnabled);

let 
  deployerAccount: PublicKey,
  deployerKey: PrivateKey,
  senderAccount: PublicKey,
  senderKey: PrivateKey,
  zkAppAddress: PublicKey,
  zkAppPrivateKey: PrivateKey;

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
zkAppPrivateKey = PrivateKey.random();
zkAppAddress = zkAppPrivateKey.toPublicKey();
let zkApp = new Contract(zkAppAddress);
console.log("zkApp Addr=", zkAppAddress.toBase58());
console.log("zkApp=", zkApp);

// deploy it 
const txn = await Mina.transaction(deployerAccount, () => {
  AccountUpdate.fundNewAccount(deployerAccount);
  zkApp.deploy();
});
await txn.prove();
// this tx needs .sign(), because `deploy()` adds an account update 
// that requires signature authorization
await txn.sign([deployerKey, zkAppPrivateKey]).send();
console.log("Deployed")

console.log("UID=", UID.uuid4())

// testing Contract now ...
console.log("begin testing contract ... updateCommunity");
await testUpdateCommunity(
  zkApp, 
  senderAccount, 
  senderKey
)

console.log("begin testing contract ... updatePerson");
await testUpdatePerson(
  zkApp, 
  senderAccount, 
  senderKey
)

console.log("begin testing contract ... updateMember");
await testUpdateMember(
  zkApp, 
  senderAccount, 
  senderKey
)
