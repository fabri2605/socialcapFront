import 'dotenv/config';
import { Mina, PrivateKey, PublicKey, AccountUpdate, fetchAccount} from 'snarkyjs';
import { CommunitiesContract, MerkleMapUpdate } from "../CommunitiesContract.js";
import { ElectorsContract } from "../ElectorsContract.js";
import { ClaimingsContract } from "../ClaimingsContract.js";

import { 
  startTest, 
  getAccountsForTesting, 
  deployContract,
  getArgvs 
} from './helpers.js';

startTest("Deploy all contracts");

let [netw, proofsEnabled] = getArgvs();

// set network and some accounts
let { 
  deployerAccount, deployerKey, 
  senderAccount, senderKey 
} = await getAccountsForTesting(netw, proofsEnabled);

// compile Contract
console.log("\nCompiling Contracts ...");
console.log("with proofsEnabled=", proofsEnabled);

// Now deploy 
/*
if (proofsEnabled) await CommunitiesContract.compile();
let zkApp01 = await deployContract("Communities", deployerAccount, deployerKey); 

if (proofsEnabled) await ClaimingsContract.compile();
let zkApp02 = await deployContract("Claimings", deployerAccount, deployerKey); 
*/
if (proofsEnabled) await ElectorsContract.compile();
let zkApp03 = await deployContract("Electors", deployerAccount, deployerKey); 
