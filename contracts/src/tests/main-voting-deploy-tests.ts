import 'dotenv/config';
import { Mina, PrivateKey, PublicKey, Field } from 'snarkyjs';
import { ClaimsVotingFactory } from "../claims-voting-factory.js";
import { rollupClaims } from "../claims-roller.js";
import { sendVote, addElectorsToNullifier, getNullifierProxy } from './claim-tests-helpers.js';

import { 
  startTest, 
  getAccountsForTesting, 
  deployContract, 
  useContract, 
getArgvs 
} from './helpers.js';

startTest("VotingContract");

let [netw, proofsEnabled] = getArgvs();

// set network and some accounts
let { 
  deployerAccount, deployerKey, 
  senderAccount, senderKey 
} = await getAccountsForTesting(netw, proofsEnabled);

// first compile it
await ClaimsVotingFactory.compile();

// now deploy  ONE Claim
let zkClaim1 = await ClaimsVotingFactory.deploy(
  Field(1001), // claimUid (simulated)
  Field(3), // 3 total votes required
  Field(2),  // 2 positives is approved
  deployerAccount, deployerKey
);



