"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffchainMerkleMap = void 0;
/**
 * OffchainMerkleMap
 * Describes a Merkle Map which will be stored in this server using a
 * RDBMS and can be accesed using the API.
 * @created - MAZito - 2023-06-06
 */
const snarkyjs_1 = require("snarkyjs");
const global_1 = require("~/global");
const uid_1 = require("~/models/uid");
const responses_1 = require("~/core/responses");
/**
 * OffchainMerkleMap
 * Describes a Merkle Map which will be stored in this server using a
 * RDBMS and can be accesed using the API.
 */
class OffchainMerkleMap {
    constructor(id, name) {
        this.id = id;
        this.name = name || "mm" + id.toString();
        this.memmap = new snarkyjs_1.MerkleMap();
        this.memmap.set((0, snarkyjs_1.Field)(0), (0, snarkyjs_1.Field)(0)); // initalize with (key=0,value=0)
        this.root = this.memmap.getRoot();
        this.count = 0;
    }
    /**
     * Get a given key+value pair from the map
     * @param uid: string: the leaf key to get
     * @returns -
     */
    async get(uid) {
        if (!uid)
            return responses_1.hasError.BadRequest(`Missing param 'uid'`);
        const storedLeaf = await global_1.prisma.merkleMapLeaf.findUnique({
            where: { uid: uid }
        });
        if (!storedLeaf)
            return responses_1.hasError.NotFound(`Not Found leaf with uid=${uid}`);
        let instance = {
            key: (0, snarkyjs_1.Field)(storedLeaf.key),
            hash: (0, snarkyjs_1.Field)(storedLeaf.hash)
        };
        return (0, responses_1.hasResult)(instance);
    }
    /**
     * Sets (inserts or updates) a given 'uid' key with its data
     * @param uid: string - the leaf key to update or insert
     * @param data: any - the leaf data pack to insert/upload
     * @param hash?: Field - optional hash of the leaf data, we will use this one if received
     * @returns MerkleMapUpdate in result or error
     */
    async set(uid, hash) {
        if (!uid)
            return responses_1.hasError.BadRequest(`Missing param 'uid'`);
        const currentRoot = this.memmap.getRoot();
        // check if the key already exists, or Null
        const storedLeaf = await global_1.prisma.merkleMapLeaf.findUnique({
            where: { uid: uid }
        });
        // the received data has already been hashed
        const key = uid_1.UID.toField(uid);
        const hashed = hash;
        const index = storedLeaf ? storedLeaf.index : this.count;
        const isNewLeaf = !storedLeaf;
        // update the current Merkle Map
        try {
            this.memmap.set(key, hashed);
            this.count = storedLeaf ? this.count : this.count + 1;
        }
        catch (err) {
            return responses_1.hasError.InternalServer(`Could not set MerkleMapLeaf with uid='${uid}' err=` + err.toString());
        }
        // update or insert the leaf
        const updatedLeaf = await global_1.prisma.merkleMapLeaf.upsert({
            where: { uid: uid },
            update: {
                hash: hashed.toString()
            },
            create: {
                uid: uid, mapId: this.id, index: index,
                key: key.toString(),
                hash: hashed.toString()
            },
        });
        // check if leaf upsert operation succeeded, on failure we must revert 
        // the Map operation because the key,hash was already updated in the Map 
        if (!updatedLeaf) {
            // rollback the key,value 
            this.memmap.set(key, storedLeaf ? (0, snarkyjs_1.Field)(storedLeaf.hash) : (0, snarkyjs_1.Field)(0));
            return responses_1.hasError.DatabaseEngine(`Could not set MerkleMapLeaf with uid='${uid}'`);
        }
        // prepare the Update instance we will return
        const merkleUpdate = {
            mapId: (0, snarkyjs_1.Field)(this.id),
            txId: (0, snarkyjs_1.Field)(0),
            beforeRoot: currentRoot,
            beforeLeaf: {
                key: (0, snarkyjs_1.Field)((storedLeaf === null || storedLeaf === void 0 ? void 0 : storedLeaf.key) || "0"),
                hash: (0, snarkyjs_1.Field)((storedLeaf === null || storedLeaf === void 0 ? void 0 : storedLeaf.hash) || "0"),
                // data: JSON.parse(storedLeaf?.data || "{}")
            },
            afterRoot: this.memmap.getRoot(),
            afterLeaf: {
                key: key,
                hash: hashed,
                // data: JSON.parse(stringified)
            }
        };
        return (0, responses_1.hasResult)(merkleUpdate);
    }
    /**
     * Get the root of the memoized Merkle map
     * @returns - the MerkleMap root
     */
    getRoot() {
        return this.memmap.getRoot() || null;
    }
    /**
     * Get a Witness of the memoized Merkle map, using its uid
     * @param uid: string - the uid of the leaf to witness
     * @returns - the MerkleMapWitness or null
     */
    getWitness(uid) {
        const key = uid_1.UID.toField(uid);
        return this.memmap.getWitness(key) || null;
    }
    /** Get the the amount of leaf nodes. */
    size() {
        return this.count;
    }
}
exports.OffchainMerkleMap = OffchainMerkleMap;
