import { Field, MerkleMapWitness } from "snarkyjs";
import { IsError, isError } from "../core/errors.js";
import { apiClient } from "../core/api-client.js";
import { LeafInstance, MerkleMapUpdate } from "./imported-defs.js";

export { OffchainMerkleMap };

class OffchainMerkleMap {
  id: number;
  name: string;
  root: Field;
  count: number;

  constructor(name: string, id: number, root: Field, count: number) {
    this.name = name;
    this.id = id;
    this.root = root;
    this.count = count;
  }

  async get(uid: string): Promise<LeafInstance | IsError> {
    const rs = await apiClient.query("get_merkle_map_leaf", { mapId: this.id, uid: uid });
    if (isError(rs)) return rs;
    
    console.log(rs);
    return rs;
  }

  async set(uid: string, data: any): Promise<MerkleMapUpdate | IsError> {
    return null;
  }

  async getWitness(uid: string): Promise<MerkleMapWitness | IsError> {
    const rs = await apiClient.query("get_merkle_map_witness", { uid: uid })
    if (isError(rs)) return rs;

    const witness = new MerkleMapWitness(rs.isLefts, rs.siblings);
    return witness;
  }

  async getRoot(): Promise<Field | IsError> {
    // we need to fetch it again, just in case it changed !
    const rs = await apiClient.query("get_merkle_map", { id: this.id })
    if (isError(rs)) return rs;
 
    this.root = Field(rs.root);
    this.count = rs.count;
    return this.root;
  }

  size(): number {
    return this.count;
  }
}
