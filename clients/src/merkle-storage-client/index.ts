import { IsError, hasError, isError } from "../core/errors.js";
import { LeafInstance, MerkleMapUpdate } from "./imported-defs.js";
import { OffchainMerkleMap } from "./offchain-merkle-map.js";
import { OffchainMerkleStorage } from "./offchain-merkle-storage.js";

export {
  LeafInstance,
  MerkleMapUpdate,
  OffchainMerkleMap,
  OffchainMerkleStorage,
  IsError, isError, hasError
}

/*
Example:

    await OffchainMerkleStorage.connect("localhost", 3081) ;

    const map = await OffchainMerkleStorage.createMerkleMap('communities');
    if (isError(map))
      // do something here ...

    const map = await OffchainMerkleStorage.getMerkleMap('communities');
    if (isError(map))
      // do something here ...

    const leaf: LeafInstance = await map.get(uid) ;
    if (isError(leaf))
      // do something here ...

    const hash = getHash(data);

    const updated: MerkleMapUpdate = await map.set(uid, data, hash);
    if (isError(updated))
      // do something here ...

    const witness = await map.getWitness(uid);
    if (isError(witness))
      // do something here ...
*/
