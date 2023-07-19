"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCommunity = void 0;
const uid_1 = require("~/models/uid");
const responses_1 = require("~/core/responses");
const index_1 = require("~/dbs/merkle/index");
const merkle_map_helpers_1 = require("~/dbs/merkle/merkle-map-helpers");
const community_helpers_1 = require("~/dbs/indexer/community-helpers");
const provable_community_1 = require("~/models/provable-community");
const mina_service_1 = require("~/services/mina-service");
async function updateCommunity(params) {
    try {
        const uid = params.uid;
        const key = uid_1.UID.toField(uid);
        // update Indexer
        const person = await (0, community_helpers_1.updateCommunityOrRaise)(uid, params);
        // update Merkle 
        const provable = new provable_community_1.ProvableCommunity(person);
        const { map, updated, witness } = await (0, merkle_map_helpers_1.updateMerkleMapOrRaise)(index_1.COMMUNITIES_MERKLE_MAP, uid, provable.hash());
        // call Mina service here ...
        await mina_service_1.MinaService.updateCommunitiesRootOrRaise(provable, map, witness, updated);
        return (0, responses_1.hasResult)(person);
    }
    catch (err) {
        return responses_1.hasError.This(err);
    }
}
exports.updateCommunity = updateCommunity;
