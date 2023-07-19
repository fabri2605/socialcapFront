import { fastify, prisma } from "~/global";
import { UID } from "~/models/uid"
import { hasError, hasResult } from "~/core/responses";
import { COMMUNITIES_MERKLE_MAP } from "~/dbs/merkle/index";
import { updateMerkleMapOrRaise } from "~/dbs/merkle/merkle-map-helpers";
import { updateCommunityOrRaise } from "~/dbs/indexer/community-helpers";
import { ProvableCommunity } from "~/models/provable-community";
import { MinaService } from "~/services/mina-service";

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
