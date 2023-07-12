import { Mina, PrivateKey, PublicKey } from 'snarkyjs';

import { deployClaimContract } from "./deploy-contract.js";

let 
  deployerAccount: PublicKey,
  deployerKey: PrivateKey,
  senderAccount: PublicKey,
  senderKey: PrivateKey;

// set instance
const Local = Mina.LocalBlockchain({ proofsEnabled: true });
Mina.setActiveInstance(Local);

// get some testing accounts
({ 
  privateKey: deployerKey, 
  publicKey: deployerAccount 
} = Local.testAccounts[0]);
({ 
  privateKey: senderKey, 
  publicKey: senderAccount 
} = Local.testAccounts[1]);
console.log("deployer Addr=", deployerAccount);
console.log("sender Addr=", senderAccount, senderKey);

let zkApp = await deployClaimContract(deployerAccount, deployerKey);

console.log("zkApp=",zkApp);
