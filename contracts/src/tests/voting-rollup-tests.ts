import 'dotenv/config';
import { Mina, PrivateKey, PublicKey, Field } from 'snarkyjs';
import { ClaimsVotingFactory } from "../claims-voting-factory.js";
import { rollupClaims } from "../claims-roller.js";
import { VotingContract } from '../VotingContract.js';
import { sendVote, addElectorsToNullifier, getNullifierProxy } from './voting-tests-helpers.js';

import { startTest, getAccountsForTesting, getArgvs } from './test-helpers.js';
import { deployContract, useContract } from '../deploy/deploy-helpers.js';

startTest("VotingContract");

let [netw, proofsEnabled] = getArgvs();

// set network and some accounts
let { 
  deployerAccount, deployerKey, 
  senderAccount, senderKey 
} = await getAccountsForTesting(netw, proofsEnabled);

console.log("\nCompiling contract ...");
await VotingContract.compile();

// now deploy  ONE Claim
let ADDR="B62qmAG58cwudEjwHBTQAfH8A6FE5t6VpHcCQJb2EC8WdQccwh3ge5e";

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
