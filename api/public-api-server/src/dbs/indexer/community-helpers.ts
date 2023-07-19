import { logger, prisma } from "~/global";
import { Community } from "@prisma/client";
import { raiseError } from "~/core/responses"
import { CommunitySchema, CommunityPartialSchema } from "../../../prisma/generated/zod";
import { EntityState } from "~/models/entity-state";
import { getPersonOrRaise } from "./person-helpers";


export const COMMUNITY_STATES = [
  "REVISION", "APPROVED", "PAYMENT", "ACTIVE", 
  "DELETED","CANCELED","PAUSED"
];

export const CommunityState = new EntityState(COMMUNITY_STATES);


export async function getCommunityOrRaise(
  uid: string
): Promise<Community> {
  const t = await prisma.community.findUnique({
    where: { uid: uid }
  });
  if (!t) raiseError.NotFound(`Community %{uid} not found`);
  return t as Community;
}


export async function updateCommunityOrRaise(
  uid: string, 
  unsafeParams: any
): Promise<Community> {
  let params: any = CommunityPartialSchema.safeParse(unsafeParams);

  // we mostly allways need this
  let current = await prisma.community.findUnique({
    where: { uid: uid }
  });
  
  if (params.state) {
    // needs additional checking here, suchs as valid state
    params.state = CommunityState.changeFrom(current?.state || "", params.state);
  }

  if (params.adminUid) {
    // we must check the adminUid for a valid PersonUid 
    const admin = await getPersonOrRaise(params.adminUid);
  }

  const upserted = await prisma.community.upsert({
    where: { uid: uid },
    update: {
      ...params
    },
    create: { 
      uid: uid, 
      name: params.name || "Yet unnamed!", 
      description: params.description || "Please describe this community",
      state: CommunityState.initial(),
      adminUid: params.adminUid as string
    },
  })

  return upserted;
}
