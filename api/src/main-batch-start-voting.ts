// import Fastify from 'fastify';
import { logger, merkleStorage } from "./global.js";
import { CLAIMED } from "@socialcap/contracts";
import { startClaimVotingProcess } from "./services/voting-process.js";
import { CommunityMembers } from "./dbs/members-helper.js";
import { getCommunityClaims, findCommunityByName } from "./dbs/community-helpers.js";

const COMMUNITY_NAME = 'MINA Navigators Community';


/**
 * Start the voting process in batch mode for all CLAIMED claims 
 * in the give community,
 */
async function run(communityName: string) {
  // we now need to get all claims from this community
  let comn = await findCommunityByName(communityName);
  if (! comn) {
    console.log(`${COMMUNITY_NAME} NOT found`)
    return;
  }

  let members = await (new CommunityMembers()).build(comn.uid);

  let claims = await getCommunityClaims(comn.uid, members, [CLAIMED]);

  // now we can start the voting process for each claim
  for (let j=0; j < claims.length ; j++) {
    let claim: any = claims[j];
    let startedClaim = await startClaimVotingProcess(claim);

    // wait for X seconds before next one ...
    const DELAY = 10000;
    await setTimeout(() => { console.log(`Waiting ${DELAY} seconds`)}, DELAY);
  }
}


// we need the Db to be ready before we can do anything
// so we make it wait for 10000 secs before running
merkleStorage.startup();

// Run it
setTimeout(async () => {
  await run(COMMUNITY_NAME); 
}, 10000);
