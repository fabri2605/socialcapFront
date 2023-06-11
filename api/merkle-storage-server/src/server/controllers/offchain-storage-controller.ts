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
  if (map) 
    return hasError.BadRequest(`MerkleMap ${name} already exists`);

  const rs = await OffchainMerkleStorage.createNewMerkleMap(name);
  if (rs.error) 
    return rs;

  return hasResult({
    id: rs.result.id,
    name: rs.result.name, 
    root: rs.result.getRoot().toString(),
    count: rs.result.size(),
  });
}

/** @returns - a MerkleMap header or an IsError  */
export async function getMerkleMap(params: {
  id?: number, // can use id, if present it has priority
  name?: string // can also use name, but not both
}): Promise<ResultOrError> { 
  let id: number = params.id || -1;

  // if name given find by name
  if (!!params.name || !params.id) {
    const name = (params.name || '').replace(/ /g, '_'); // cleanup whitespace
    const map: any = await prisma.merkleMap.findFirst({
      where: { name: name}
    })
    if (!map) 
      return hasError.NotFound(`Not Found MerkleMap with name='${name}'`);
    id = map.id;
  }

  const rs = await OffchainMerkleStorage.getMerkleMap(id);
  if (rs.error) 
    return rs;

  return hasResult({
    id: rs.result.id,
    name: rs.result.name, 
    root: rs.result.getRoot().toString(),
    count: rs.result.size(),
  });
}

/** @returns - a LeafInstance or an IsError  */
export async function getMerkleMapLeaf(params: {
  mapId: number, 
  uid: string
}): Promise<ResultOrError> { 
  const rsm = await OffchainMerkleStorage.getMerkleMap(params.mapId);
  if (rsm.error) 
    return rsm;

  const merkleMap = rsm.result;
  const rsl = await merkleMap.get(params.uid);
  return rsl; 
}

/** @returns - a MerkleMapWitness or an IsError  */
export async function getMerkleMapWitness(params: {
  mapId: number, 
  uid: string
}): Promise<ResultOrError> { 
  const rsm = await OffchainMerkleStorage.getMerkleMap(params.mapId);
  if (rsm.error) 
    return rsm;

  const merkleMap = rsm.result;
  const witness = await merkleMap.getWitness(params.uid);
  console.log(witness);
  return hasResult({ ...witness }); 
}

/** @returns - a MerkleMapUpdate or an IsError  */
export async function setMerkleMapLeaf(params: {
  mapId: number, 
  uid: string,
  data: any
}): Promise<ResultOrError> { 
  const rsm = await OffchainMerkleStorage.getMerkleMap(params.mapId);
  if (rsm.error) 
    return rsm;

  const merkleMap = rsm.result;
  const rsl = await merkleMap.set(params.uid, params.data);
  return rsl; 
}
