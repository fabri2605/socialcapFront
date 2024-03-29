import 'dotenv/config';
import { Mina, PrivateKey, PublicKey, Field } from 'snarkyjs';
import { ClaimsVotingFactory } from "../claims-voting-factory.js";
import { rollupClaims } from "../claims-roller.js";
import { VotingContract } from '../VotingContract.js';
import { sendVote, addElectorsToNullifier, getNullifierProxy } from './voting-tests-helpers.js';

import { startTest, getAccountsForTesting, getArgvs } from './test-helpers.js';
import { deployContract, useContract } from '../deploy/deploy-helpers.js';

console.log("\n-------------------------------------------------------------------------------------------------------------");

startTest("VotingContract");

let [netw, proofsEnabled] = getArgvs();

// set network and some accounts
let { 
  deployerAccount, deployerKey, 
  senderAccount, senderKey 
} = await getAccountsForTesting(netw, proofsEnabled);

console.log("\nCompiling contract ...");
await VotingContract.compile();

// now open ONE Claim
let ADDR="B62qpakD3CRKEWYqFjxxowMvrHswkretnDXBkcGg1PLgyNF2iVpF3Na";

let zkClaim1 = await ClaimsVotingFactory.getInstance(
  PublicKey.fromBase58(ADDR)
);

// run the rollups for all open claims ...
for (let j=0; j < 3; j++) {
  await rollupClaims(
    //[zkClaim1, zkClaim2, zkClaim3],
    [zkClaim1],
    // we should think about who will be the payer here, maybe a special 
    // Socialcap account for this funded on demand ?
    senderAccount, senderKey
  )
}
