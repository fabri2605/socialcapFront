import { logger, prisma } from "~/global";
import { Person } from "@prisma/client";
import { Errors, raiseError } from "~/routes/errors"
import { MerkleMapProxy, MerkleMapUpdate } from "./definitions";
import { OffchainMerkleMap } from "./offchain-merkle-map";
import { OffchainMerkleStorage } from "./offchain-merkle-storage";


export async function getMerkleMapOrRaise(
  id: number
): Promise<OffchainMerkleMap> {
  const rs = await OffchainMerkleStorage.getMerkleMap(id);
  if (rs.error) raiseError(`Could not get MerkleMap ${id}`);
  return rs.data;
}

export async function getMerkleLeafOrRaise(
  map: OffchainMerkleMap,
  key: string,
): Promise<OffchainMerkleMap> {
  return map;
}

export async function setMerkleLeafOrRaise(
  map: OffchainMerkleMap,
  key: string,
  value: any
): Promise<MerkleMapUpdate> {
  return {} as MerkleMapUpdate;
}

export async function getMerkleWitnessOrRaise(
  map: OffchainMerkleMap,
  key: string,
): Promise<OffchainMerkleMap> {
  return map;
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
