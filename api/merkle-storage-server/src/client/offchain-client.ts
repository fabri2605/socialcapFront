
import { Field, MerkleMapWitness, Undefined } from "snarkyjs";
import { IsError, hasError, isError } from "./errors.js";
import { LeafInstance, MerkleMapUpdate } from "../storage/index.js";

class MerkleMapProxy {
  id = 0;
  name = "";
  root: Field = Field(0);
  count = 0;

  async get(uid: string): Promise<LeafInstance | IsError> {
    return null;
  }

  async set(uid: string, data: any): Promise<MerkleMapUpdate | IsError> {
    return null;
  }

  async getWitness(uid: string): Promise<MerkleMapWitness | IsError> {
    return null;
  }

  async getRoot(): Promise<Field | IsError> {
    return this.root;
  }

  size(): number {
    return this.count;
  }
}


class OffchainMerkleStorageProxy {

  private API_TOKEN: string; // localhost:3081/api/...

  static async connect(
    host: string, 
    port: number,
    authorization: string
  ): Promise<boolean | IsError> {
    return hasError.Unknown();
  }

  static async createMerkleMap(
    name: string
  ): Promise<MerkleMapProxy | IsError> {
    return hasError.Unknown();
  }

  static async getMerkleMap(
    name: string
  ): Promise<MerkleMapProxy | IsError> {
    return hasError.Unknown();
  }
}