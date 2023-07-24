import { apiClient, AppStatus } from "$lib/globals";
import { monitorMINATransaction } from "./monitors";

export { 
  updateProfile, 
  updateCommunity, 
  joinCommunity 
}


async function updateProfile(data: any): Promise<any> {
  AppStatus.push("Updating profile ...");  

  let rs = await apiClient.mutate("update_profile", data);
  if (rs.error) {
    AppStatus.error("There is some error with the data, please review !");
    return null;
  }  
  AppStatus.push("Profile updated !");  
  
  AppStatus.push("Now waiting for MINA transaction to complete");  
  monitorMINATransaction(rs.data.transaction.id);

  return rs.data.profile;
}


async function updateCommunity(data: any): Promise<any> {
  AppStatus.push("Updating community ...");  

  let rs = await apiClient.mutate("update_community", data);
  if (rs.error) {
    AppStatus.error("There is some error with the data, please review !");
    return null;
  }  
  AppStatus.push("Community updated !");  
  
  AppStatus.push("Now waiting for MINA transaction to complete");  
  monitorMINATransaction(rs.data.transaction.id);

  return rs.data.community;
}


async function joinCommunity(data: any): Promise<any> {
  AppStatus.push("Adding as member to a community ...");  
  let { communityUid, personUid } = data;

  let rs = await apiClient.mutate("join_community", {
    communityUid: communityUid,
    personUid: personUid
  });
  if (rs.error) {
    AppStatus.error("There is some error with the data, please review !");
    return null;
  }  
  AppStatus.push("Member added !");  
  
  AppStatus.push("Now waiting for MINA transaction to complete");  
  monitorMINATransaction(rs.data.transaction.id);

  return rs.data.member;
}
