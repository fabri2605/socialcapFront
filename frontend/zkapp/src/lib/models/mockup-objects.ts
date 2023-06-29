import { MasterPlan, aMasterPlanMockup } from "./MasterPlan";
import { Claim, aClaimMockup } from './Claim';
import { CapCredential, aCredentialMockup } from "./Credential";
import { ClaimsCollection, olClaimablesMockup, olSubmitedClaimsMockup } from "./ClaimsCollection";
import { CredentialsCollection, olCredentialsMockup } from "./CredentialsCollection";

export { 
  aMasterPlan, aClaim, aCredential, aTask, aCommunity, aProfile, aAdminCommunity,
  olClaimables, olSubmitedClaims, olCredentials, olTasks, olCommunities, olAdminCommunities 
};

/*
  MOCKUP ORDERED LISTS (olTs)

  - olClaimables
  - olCredentials
  - olSubmitedClaims
  - olCommunities
  - olTasks
  - olAdminCommunities

  MOCKUP SINGLE OBJECTS (aT)
  
  - aTask
  - aAdminCommunity
  - aCommunity
  - aProfile
  - aClaim DONE
  - aMasterPlan DONE
  - aCredential DONE
*/

const aClaim = Claim.fromJSON(JSON.stringify(aClaimMockup));

const aMasterPlan = MasterPlan.fromJSON(JSON.stringify(aMasterPlanMockup));

const aCredential = CapCredential.fromJSON(JSON.stringify(aCredentialMockup));

const olClaimables = ClaimsCollection.fromJSON(JSON.stringify(olClaimablesMockup));

const olSubmitedClaims = ClaimsCollection.fromJSON(JSON.stringify(olSubmitedClaimsMockup));

const olCredentials = CredentialsCollection.fromJSON(JSON.stringify(olCredentialsMockup));

const olAdminCommunities = [];

const olTasks = [];

const olCommunities = [];

