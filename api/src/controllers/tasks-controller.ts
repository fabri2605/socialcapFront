import { PublicKey } from "snarkyjs";
import { NullifierProxy, UID } from "@socialcap/contracts";
import { CLAIMED, WAITING, UNPAID, VOTING } from "@socialcap/contracts";
import { fastify, prisma, logger } from "../global.js";
import { hasError, hasResult, raiseError } from "../responses.js";
import { waitForTransaction } from "../services/mina-transactions.js";
import { updateEntity, getEntity } from "../dbs/any-entity-helpers.js";
import { getNullifierProxy } from "../dbs/nullifier-helpers.js";
import { NULLIFIER_MERKLE_MAP } from "../dbs/index.js";


export async function getTask(params: any) {
  const uid = params.uid;
  let data = await getEntity("task", uid);

  let claim = await getEntity("claim", data.claimUid);
  let plan = await getEntity("plan", claim.planUid);
  let comn = await getEntity("community", claim.communityUid);
  claim.evidenceData = JSON.parse(claim.evidenceData);
  plan.strategy = JSON.parse(plan.strategy);
  claim.requiredVotes = plan.strategy.minVotes;
  claim.requiredPositives = plan.strategy.minPositives;
  data.claim = claim;
  data.plan = plan;
  data.community = comn;
  return hasResult(data); 
}


export async function getMyTasks(params: any) {
  const userUid = params.user.uid;

  // all commnunity Uids where is a a member
  const tasks = await prisma.task.findMany({
    where: { assigneeUid: userUid },
    orderBy: { assignedUTC: 'asc' }
  })
  if (! tasks) 
    return hasResult([]);

  const cluids  = tasks.map((t) => t.claimUid);
  const claims = await prisma.claim.findMany({
    where: { uid: { in: cluids } }
  })
  const mapClaims: any = {};
  (claims || []).map((t) => { mapClaims[t.uid] = t;})

  const pluids  = claims.map((t) => t.planUid);
  const plans = await prisma.plan.findMany({
    where: { uid: { in: pluids } }
  })
  const mapPlans: any = {};
  (plans || []).map((t) => { mapPlans[t.uid] = t;})

  const comnuids  = claims.map((t) => t.communityUid);
  const comns = await prisma.community.findMany({
    where: { uid: { in: comnuids } }
  })
  const mapComns: any = {};
  (comns || []).map((t) => { mapComns[t.uid] = t;})
  
  // we patch some additional data into each Task
  let patched = (tasks || []).map((t: any) => {
    t.claim = mapClaims[t.claimUid];
    t.plan = mapPlans[t.claim.planUid];
    t.community = mapComns[t.claim.communityUid];
    return t; 
  })

  return hasResult(patched);
}


export async function updateTaskState(params: any) {
  const uid = params.uid;
  // we need to also update the Nullifier !
}


export async function getNullifier(params: any) {
  const claimUid = params.claimUid;
  const senderAccountId =  params.senderAccountId;

  const leafs = await prisma.merkleMapLeaf.findMany({
    select: { index: true, key: true, hash: true, },
    where: { mapId: NULLIFIER_MERKLE_MAP },
    orderBy: { index: 'asc' }
  })

  let arr: any = [];
  for (let j=0; j < leafs.length; j++) {
    arr.push({
      key: leafs[j].key,
      hash: leafs[j].hash
    })
  }

  return hasResult({
    count: leafs.length,
    leafs: arr
  })
  // let nullifier: NullifierProxy = await getNullifierProxy(
  //   PublicKey.fromBase58(senderAccountId),
  //   UID.toField(claimUid)
  // )
  // console.log("nullifier witness=", nullifier.witness.toJSON());
  // return hasResult(nullifier);
}