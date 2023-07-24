import { apiClient, AppStatus } from "$lib/globals";

export { 
  getMyCommunities,
  getAllCommunities,
  getCommunity
}

async function getCommunity(uid: string): Promise<any[]> {
  let rs = await apiClient.query("get_community", { uid: uid });
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
