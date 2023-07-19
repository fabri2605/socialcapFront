"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerkleMapWitness = exports.MerkleMapProxy = exports.MerkleMapUpdate = exports.LeafInstance = void 0;
const snarkyjs_1 = require("snarkyjs");
Object.defineProperty(exports, "MerkleMapWitness", { enumerable: true, get: function () { return snarkyjs_1.MerkleMapWitness; } });
/**
 * LeafInstance
 * Describes a MerkleMap leaf, which contains both the 'data' stored in the
 * leaf and the 'hash' of this data. The 'hash' value is calculated by
 * the 'set(key,data)' method when we update the MerkleMap.
 */
class LeafInstance extends (0, snarkyjs_1.Struct)({
    key: snarkyjs_1.Field,
    hash: snarkyjs_1.Field, // the hashed(data) value as 
    // data: any // the leaf real data content, as a JSON object 
}) {
}
exports.LeafInstance = LeafInstance;
/**
 * MerkleMapUpdate
 * Describes the last "provable?" change applied to a given OffchainMerkleMap
 * after using the .set(key,data) method on it. It can be used to update the
 * state of commitment (a Merkle root) in a MINA account.
 * Contains both the previous map state and the current updated state.
*/
class MerkleMapUpdate extends (0, snarkyjs_1.Struct)({
    // transaction id of the transaction which produced the change
    txId: snarkyjs_1.Field,
    // the map index (may be redundant but useful)
    mapId: snarkyjs_1.Field,
    // root and leaf value BEFORE we applied the update
    beforeRoot: snarkyjs_1.Field,
    beforeLeaf: LeafInstance,
    // root and leaf value AFTER we applied this update
    afterRoot: snarkyjs_1.Field,
    afterLeaf: LeafInstance
}) {
}
exports.MerkleMapUpdate = MerkleMapUpdate;
/**
 * Represents a MerkleMap existing in the offchain storage.
 * We dont have the map data (nodes or leafs) here, we just
 * have the root and some identification info.
 */
class MerkleMapProxy extends (0, snarkyjs_1.Struct)({
    id: snarkyjs_1.UInt32,
    name: snarkyjs_1.CircuitString,
    root: snarkyjs_1.Field,
    count: snarkyjs_1.Field,
}) {
}
exports.MerkleMapProxy = MerkleMapProxy;
