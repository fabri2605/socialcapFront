import { apiClient, AppStatus } from "$lib/globals";
import { PublicKey, MerkleMapWitness, MerkleMap, Field, Bool } from "snarkyjs";
import { UID, NullifierProxy } from "@socialcap/contracts";

export { 
  getMyCommunities,
  getAllCommunities,
  getCommunity,
  getAdminedCommunity,
  getPlan,
  getMyClaimables,
  getMyClaims,
  getClaim,
  getTask,
  getMyTasks,
  getNullifier
}


async function getCommunity(uid: string): Promise<any> {
  let rs = await apiClient.query("get_community", { uid: uid });
  if (rs.error) return null;
  return rs.data;
}


async function getAdminedCommunity(uid: string): Promise<any> {
  let rs = await apiClient.query("get_admined_community", { uid: uid });
  if (rs.error) return null;
  return rs.data;
}


async function getMyCommunities(): Promise<any[]> {
  let rs = await apiClient.query("get_my_communities", {});
  if (rs.error) return [];
  return rs.data;
}


async function getAllCommunities(params: any): Promise<any[]> {
  let rs = await apiClient.query("get_all_communities", params);
  if (rs.error) return [];
  return rs.data;
}


async function getPlan(uid: string): Promise<any> {
  let rs = await apiClient.query("get_plan", { uid: uid });
  if (rs.error) return null;
  return rs.data;
}


async function getMyClaimables(params: any): Promise<any[]> {
  let rs = await apiClient.query("get_my_claimables", params);
  if (rs.error) return [];
  return rs.data;
}

async function getMyClaims(params: any): Promise<any[]> {
  let rs = await apiClient.query("get_my_claims", params);
  if (rs.error) return [];
  return rs.data;
}

async function getClaim(uid: string): Promise<any> {
  let rs = await apiClient.query("get_claim", { uid: uid });
  if (rs.error) return null;
  return rs.data;
}


async function getMyTasks(params: any): Promise<any[]> {
  let rs = await apiClient.query("get_my_tasks", params);
  if (rs.error) return [];
  return rs.data;
}

async function getTask(uid: string): Promise<any> {
  let rs = await apiClient.query("get_task", { uid: uid });
  if (rs.error) return null;
  return rs.data;
}


async function getNullifier(params: any): Promise<any> {
  let rs = await apiClient.query("get_nullifier", params);
  if (rs.error) return null;

  let leafs = rs.data?.leafs || [];
  let map = new MerkleMap();
  for (let j=0; j < leafs.length; j++) {
    const key = Field(leafs[j].key);
    const hashed = Field(leafs[j].hash);
    map.set(key, hashed);
  }

  const claimUid = params.claimUid;
  const senderAccountId =  params.senderAccountId;
  let key = NullifierProxy.key(
    PublicKey.fromBase58(senderAccountId),
    UID.toField(claimUid)
  )

  let nullifier: NullifierProxy = {
    root: map.getRoot(),
    witness: map.getWitness(key)
  }

  return nullifier;
}
