import { logger, prisma } from "../../core/global.js";
import { hasResult, hasError, ResultOrError } from "../../core/responses.js";
import { OffchainMerkleStorage } from "../../storage/offchain-merkle-storage.js";

/** @returns - a MerkleMap header or an IsError  */
export async function createMerkleMap(params: {
  name: string
}): Promise<ResultOrError> { 
  const name = params.name.replace(/ /g, '_'); // cleanup whitespace
  const map = await prisma.merkleMap.findFirst({
    where: { name: name}
  })
  if (map) return hasError.BadRequest(`MerkleMap ${name} already exists`);

  const rs = await OffchainMerkleStorage.createNewMerkleMap(name);
  if (rs.error) return rs;

  return hasResult({
    id: rs.data.id,
    name: rs.data.name, 
    root: rs.data.getRoot().toString(),
    size: rs.data.size(),
  });
}

/** @returns - a MerkleMap header or an IsError  */
export async function getMerkleMap(params: {
  id: number
}): Promise<ResultOrError> { 
  const rs = await OffchainMerkleStorage.getMerkleMap(params.id);
  if (rs.error) return rs;

  return hasResult({
    id: rs.data.id,
    name: rs.data.name, 
    root: rs.data.getRoot().toString(),
    size: rs.data.size(),
  });
}

/** @returns - a LeafInstance or an IsError  */
export async function getMerkleMapLeaf(params: {
  mapId: number, 
  uid: string
}): Promise<ResultOrError> { 
  const rsm = await OffchainMerkleStorage.getMerkleMap(params.mapId);
  if (rsm.error) return rsm;

  const merkleMap = rsm.data;
  const rsl = await merkleMap.get(params.uid);
  return rsl; 
}

/** @returns - a MerkleMapWitness or an IsError  */
export async function getMerkleMapWitness(params: {
  mapId: number, 
  uid: string
}): Promise<ResultOrError> { 
  const rsm = await OffchainMerkleStorage.getMerkleMap(params.mapId);
  if (rsm.error) return rsm;

  const merkleMap = rsm.data;
  const rsl = await merkleMap.getWitness(params.uid);
  return rsl; 
}

/** @returns - a MerkleMapUpdate or an IsError  */
export async function setMerkleMapLeaf(params: {
  mapId: number, 
  uid: string,
  data: any
}): Promise<ResultOrError> { 
  const rsm = await OffchainMerkleStorage.getMerkleMap(params.mapId);
  if (rsm.error) return rsm;

  const merkleMap = rsm.data;
  const rsl = await merkleMap.set(params.uid, params.data);
  return rsl; 
}
