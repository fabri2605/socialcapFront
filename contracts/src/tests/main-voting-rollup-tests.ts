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

/*
// now deploy  ONE Claim
let zkClaim1 = await ClaimsVotingFactory.deploy(
  Field(1001), // claimUid (simulated)
  Field(3), // 3 total votes required
  Field(2),  // 2 positives is approved
  deployerAccount, deployerKey
);
*/
let ADDR="B62qkNrf2DcHrUjSxAdvC71oRKYS2sXpzZgP2JGNM5q6vKT42xVsmEb";

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
