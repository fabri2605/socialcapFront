import { apiClient, appStatus } from "$lib/globals";

export { CurrentUser, isFirstTimeUser, getCurrentUser }

interface CurrentUser {
  fullName: string,
  uid: string,
  hasMemberships: boolean,
  hasClaims: boolean,
  hasCredentials: boolean,
  hasTasks: boolean,
  hasAdmins: boolean,
}

let currentUser: any = null; 

function isFirstTimeUser(u: CurrentUser) {
  /**
   * It is the first time the user comes in, 
   * so it is still not a member of any community
   * and has no claims or credentials.
   */
  return (
    !u.hasMemberships
    && !u.hasClaims
    && !u.hasCredentials
    && !u.hasTasks
    && !u.hasAdmins
  )
}

async function getCurrentUser(isAuthenticated: boolean): Promise<any> {
  if (currentUser) 
    return currentUser;

  let rs = await apiClient.query("get_profile", {});
  if (rs.error) return null;
  let profile = rs.data;

  currentUser = {
    uid: profile.uid,
    hasMemberships: true,
    hasClaims: false,
    hasCredentials: true,
    hasTasks: true,
    hasAdmins: true,
    profile: profile
  };
  return currentUser;
}
