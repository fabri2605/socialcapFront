
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

function getCurrentUser(): CurrentUser {
  return {
    fullName: "Marcos del Cielo Nublado",
    uid: "1234",
    hasMemberships: true,
    hasClaims: false,
    hasCredentials: true,
    hasTasks: true,
    hasAdmins: true,
  };
}
