"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffchainMerkleStorage = void 0;
/**
 * OffchainMerkleStorage
 * Manages a cached offchain storage for Merkle Maps
 * where map header and leafs are stored in a RDB
 * @created - MAZito - 2023-06-06
 */
const snarkyjs_1 = require("snarkyjs");
const global_1 = require("~/global");
const responses_1 = require("~/core/responses");
const offchain_merkle_map_1 = require("./offchain-merkle-map");
class OffchainMerkleStorage {
    /**
     * Gets and rebuilds an existent MerkleMap using the stored data leafs
     * @param id - the MerkleMap ID
     * @returns - OffchainMerkleMap or IsError
     */
    static async getMerkleMap(id) {
        if (!OffchainMerkleStorage.started)
            return responses_1.hasError.DatabaseEngine(`OffchainMerkleStorage not started`);
        // first chech if we already have it in the cache
        let cached = OffchainMerkleStorage.cache.get(id);
        if (cached)
            return (0, responses_1.hasResult)(cached);
        // not in cache, get from Db
        const map = await global_1.prisma.merkleMap.findUnique({
            where: { id: id }
        });
        if (!map)
            return responses_1.hasError.NotFound(`Not Found MerkleMap with id=${id}`);
        // rebuild this instance using the leafs, MAY be slow ? 
        const instance = new offchain_merkle_map_1.OffchainMerkleMap(id, map === null || map === void 0 ? void 0 : map.name);
        const leafs = await global_1.prisma.merkleMapLeaf.findMany({
            select: { index: true, key: true, hash: true, },
            where: { mapId: map === null || map === void 0 ? void 0 : map.id },
            orderBy: { index: 'asc' }
        });
        for (let j = 0; j < leafs.length; j++) {
            const key = (0, snarkyjs_1.Field)(leafs[j].key);
            const hashed = (0, snarkyjs_1.Field)(leafs[j].hash);
            instance.memmap.set(key, hashed);
        }
        instance.count = leafs.length;
        // MUST add it to the cache 
        OffchainMerkleStorage.cache.set(id, instance);
        return (0, responses_1.hasResult)(instance);
    }
    /**
     * Creates a new MerkleMap and initializes it
     * @param name - the MerkleMap name
     * @returns - OffchainMerkleMap instance or error
     */
    static async createNewMerkleMap(name) {
        if (!OffchainMerkleStorage.started)
            return responses_1.hasError.DatabaseEngine(`OffchainMerkleStorage not started`);
        // add to database ...
        const map = await global_1.prisma.merkleMap.create({
            data: { name: name, root: 0, size: 0, height: 256 },
        });
        if (!map)
            return responses_1.hasError.DatabaseEngine(`Could not create new Merkle Map with name='${name}'`);
        const instance = new offchain_merkle_map_1.OffchainMerkleMap(map.id, map.name);
        // MUST add it to the cache 
        OffchainMerkleStorage.cache.set(map.id, instance);
        global_1.logger.info(`Created merkleMap '${name}' with id=${map.id}`);
        return (0, responses_1.hasResult)(instance);
    }
    /**
     * Startup the Offchain storage by creating a cache for all Merkle maps.
     * The Merkle maps will not be loaded here, but when someone asks for it.
     */
    static startup() {
        if (OffchainMerkleStorage.started)
            return;
        console.log("OffchainMerkleStorage starting ...");
        setTimeout(async () => {
            const maps = await global_1.prisma.merkleMap.findMany({ orderBy: { id: 'asc' } });
            // reset the cache for all of them
            for (let j = 0; j < maps.length; j++) {
                OffchainMerkleStorage.cache.set(maps[j].id, null);
            }
            OffchainMerkleStorage.started = true;
            console.log("OffchainMerkleStorage started");
        }, 100);
        return OffchainMerkleStorage;
    }
}
exports.OffchainMerkleStorage = OffchainMerkleStorage;
// All MerkleMaps are memoized while server is running
OffchainMerkleStorage.cache = new Map();
// The startup status
OffchainMerkleStorage.started = false;
