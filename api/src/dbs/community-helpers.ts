import { prisma } from "../global.js";
import { CommunityMembers } from "./members-helper.js";
import { DRAFT, CLAIMED, IGNORED } from "@socialcap/contracts";


export async function getCommunityClaims(
  uid: string, 
  members: CommunityMembers,
  states?: number[]
) {
  states = states || [DRAFT,CLAIMED,IGNORED];

  // first the bare claims for this community (ALL of them)
  let claims = await prisma.claim.findMany({
    where: { AND: [
      { communityUid: uid },
      { state: { in: states }}
    ]},
    orderBy: { applicantUid: 'asc' }
  }) as any;

  // add the applicant info to every claim
  claims = (claims || []).map((claim: any) => {
    claim.applicant = members.findByUid(claim.applicantUid);
    return claim;
  })

  return claims;
}


export async function getCommunityCounters(uid: string) {
  const nMembers = await prisma.members.count({
    where: { communityUid: uid },
  })    

  const nClaims = await prisma.claim.count({
    where: { AND: [{communityUid: uid}, {state: CLAIMED}] }
  })    

  const nCredentials = await prisma.credential.count({
    where: { communityUid: uid },
  })    

  return {
    countMembers: nMembers || 0,
    countClaims: nClaims || 0,
    countCredentials: nCredentials || 0
  }
}
