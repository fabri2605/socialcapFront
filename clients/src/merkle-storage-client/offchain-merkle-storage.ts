import { Field } from "snarkyjs";
import { apiClient } from "../core/globals.js";
import { ValueOrError } from "../core/responses.js";
import { OffchainMerkleMap } from "./offchain-merkle-map.js"

export { OffchainMerkleStorage };

class OffchainMerkleStorage {

  static async connect(
    host: string, port: number, apiKey?: string
  ) {
    await apiClient.connect(host, port, apiKey);
  }

  static async createMerkleMap(
    name: string
  ): Promise<ValueOrError<OffchainMerkleMap>> {
    const [rs, error] =await apiClient.mutate("create_merkle_map", { name: name })
    if (error) return [null, error];

    const map = new OffchainMerkleMap(
      rs.name, 
      rs.id, 
      Field(rs.root), 
      rs.count
    );
    return [map, null];
  }

  static async getMerkleMap(
    name: string
  ): Promise<ValueOrError<OffchainMerkleMap>> {
    const [rs, error] =await apiClient.query("get_merkle_map", { name: name })
    if (error) return [null, error];

    const map = new OffchainMerkleMap(
      rs.name, 
      rs.id, 
      Field(rs.root), 
      rs.count
    );
    return [map, null];
  }
}