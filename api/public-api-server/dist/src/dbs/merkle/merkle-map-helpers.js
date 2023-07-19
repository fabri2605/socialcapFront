"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMerkleMapOrRaise = void 0;
const snarkyjs_1 = require("snarkyjs");
const errors_1 = require("~/core/errors");
const offchain_merkle_storage_1 = require("./offchain-merkle-storage");
async function updateMerkleMapOrRaise(mapid, uid, value) {
    const rs1 = await offchain_merkle_storage_1.OffchainMerkleStorage.getMerkleMap(mapid);
    if (rs1.error)
        errors_1.raiseError.NotFound(`Could not get MerkleMap ${mapid}`);
    let map = rs1.data;
    const rs2 = await map.set(uid, value);
    if (rs2.error)
        errors_1.raiseError.This(rs2.error);
    const update = rs2.data;
    const witness = map.getWitness(uid);
    const proxy = {
        id: snarkyjs_1.UInt32.from(mapid),
        name: snarkyjs_1.CircuitString.fromString(""),
        root: map.getRoot(),
        count: (0, snarkyjs_1.Field)(map.size()),
    };
    return {
        map: proxy,
        witness: witness,
        updated: update
    };
}
exports.updateMerkleMapOrRaise = updateMerkleMapOrRaise;
