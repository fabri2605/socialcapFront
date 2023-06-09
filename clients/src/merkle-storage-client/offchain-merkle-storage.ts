import { Field } from "snarkyjs";
import { IsError, isError } from "../core/errors.js";
import { apiClient } from "../core/api-client.js";
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
  ): Promise<OffchainMerkleMap | IsError> {
    const rs = await apiClient.mutate("create_merkle_map", { name: name })
    if (isError(rs)) return rs;

    const map = new OffchainMerkleMap(rs.name, rs.id, Field(rs.root), rs.count);
    return map;
  }

  static async getMerkleMap(
    name: string
  ): Promise<OffchainMerkleMap | IsError> {
    const rs = await apiClient.query("get_merkle_map", { name: name })
    if (isError(rs)) return rs;

    const map = new OffchainMerkleMap(rs.name, rs.id, Field(rs.root), rs.count);
    return map;
  }
}