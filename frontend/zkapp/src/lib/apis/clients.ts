
import { Indexer } from "./indexer";
import { Task, Claim, MasterPlan, Community } from "@models/index"

import { 
  olAllCommunities, olMyCommunities 
} from "@models/mockup-objects";


async function getTask(uid: string): Promise<Task | null> {
  // first get the current task
  let rsp = await Indexer.query("get_task_by_uid", { uid: uid });
  if (rsp.error) return null;

  let task = Task.fromJSON(rsp.data);

  const claim = await getClaim(task.claimUid) ;

  task.requiredVotes = claim?.requiredVotes || 0;
  task.currentVotes = claim?.totalVotes || 0;
  task.type = claim?.type || "";
  task.description = claim?.description || "";
  task.community = claim?.community || "";

  return task;
}

async function getClaim(uid: string): Promise<Claim | null> {
  // first get the current task
  let rsp = await Indexer.query("get_claim_by_uid", { uid: uid });
  if (rsp.error) return null;

  let claim = Claim.fromJSON(rsp.data);

  const plan = await getMasterPlan(claim.planUid) ;
  claim.type = plan?.name || "";
  claim.description = plan?.description || "";
  claim.image = plan?.image || "";
  
  claim.community = "???";
  return claim;
}

async function getMasterPlan(uid: string): Promise<MasterPlan | null> {
  // first get the current task
  let rsp = await Indexer.query("get_plan_by_uid", { uid: uid });
  if (rsp.error) return null;

  let plan = MasterPlan.fromJSON(rsp.data);

  let community = await getCommunity(plan.communityUid);
  plan.community = community.name;

  return plan;
}

async function getCommunity(uid: string): Promise<any | null> {
  // first get the current task
  let rsp = await Indexer.query("get_community_by_uid", { uid: uid });
  if (rsp.error) return null;

//   /let community = Community.fromJSON(rsp.data);
// return community;
  
  return {};
}


async function getAllCommunities(orderBy: string): Promise<any[] | null> {
  return olAllCommunities;
}

async function getMyCommunities(orderBy: string): Promise<any[] | null> {
  return olMyCommunities;
}
