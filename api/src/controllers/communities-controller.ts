import { UID } from "@socialcap/contracts";
import { fastify, prisma } from "../global.js";
import { hasError, hasResult } from "../responses.js";
import { updateEntity, getEntity } from "../dbs/any-entity-helpers.js";


export async function getCommunity(params: any) {
  const uid = params.uid;
  let data = await getEntity("community", uid);
  return hasResult(data); 
}


export async function updateCommunity(params: any) {
  const uid = params.new 
    ? UID.uuid4() // ONLY when we receive this we assign a new UID
    : params.uid; 

  let rs = await updateEntity("community", uid, params);
  let cm = rs.proved;

  let memberUid = cm.uid+cm.adminUid;
  await updateEntity("members", memberUid, {
    communityUid: cm.uid,
    personUid: cm.adminUid,
    role: "1", // PLAIN,
    new: params.new
  })

  return hasResult({
    community: rs.proved,
    transaction: rs.transaction
  }); 
}


export async function getMyCommunities(params: any) {
  const userUid = params.user.uid;

  const members = await prisma.members.findMany({
    where: { personUid: userUid }
  })
  const cuids  = members.map((t) => t.communityUid);

  const communities = await prisma.community.findMany({
    where: { uid: { in: cuids } },
    orderBy: { name: 'asc' }
  })
  return hasResult(communities);
}

export async function getAllCommunities(params: any) {
  const userUid = params.user.uid;

  const communities = await prisma.community.findMany({
    orderBy: { name: 'asc' }
  })
  return hasResult(communities);
}