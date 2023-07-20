import { fastify, prisma } from "../global";
import { UID, ProvableCommunity } from "@socialcap/contracts";
import { hasError, hasResult } from "../responses.js";
import { COMMUNITIES_MERKLE_MAP } from "../dbs/index.js";
import { updateMerkleMapOrRaise } from "../dbs/merkle-map-helpers.js";
import { updateCommunityOrRaise } from "../dbs/community-helpers.js";
import { MinaService } from "../services/mina-service.js";

export async function updateCommunity(params: any) {
  try {
    const uid = params.uid;
    const key = UID.toField(uid);
    
    // update Indexer
    const person = await updateCommunityOrRaise(uid, params);
    
    // update Merkle 
    const provable = new ProvableCommunity(person);
    const {map, updated, witness} = await updateMerkleMapOrRaise(
      COMMUNITIES_MERKLE_MAP, uid, provable.hash()
    );

    // call Mina service here ...
    await MinaService.updateCommunitiesRootOrRaise(
      provable, map, witness, updated
    );

    return hasResult(person); 
  }
  catch (err: any) {
    return hasError.This(err);
  }
}
