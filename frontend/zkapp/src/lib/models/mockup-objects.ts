import { MasterPlan, aMasterPlanMockup } from "./master-plan";
import { Claim } from './claim';
import { CapCredential, aCredentialMockup } from "./credential";
import { ClaimsCollection, olSubmitedClaimsMockup } from "./claims-collection";
import { CredentialsCollection, olCredentialsMockup } from "./credentials-collection";
import { ClaimablesCollection } from "./claimables-collection";
import { Task } from "./task";
import { TasksCollection } from "./tasks-collection";
import { Community } from "./community";
import { Person } from "./person"

export { 
  aMasterPlan, aClaim, aCredential, aTask, aCommunity, aProfile, 
  aAdminCommunity,
  olClaimables, olSubmitedClaims, olCredentials, olTasks, 
  olAllCommunities, olMyCommunities, 
  olAdminCommunities 
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

// const aUser = getCurrentUser();

const aMasterPlan = MasterPlan.mockup();
const aClaim = Claim.mockup();
const olClaimables = ClaimablesCollection.mockup();
const olSubmitedClaims = ClaimsCollection.fromJSON(JSON.stringify(olSubmitedClaimsMockup));

const aCredential = CapCredential.fromJSON(JSON.stringify(aCredentialMockup));
const olCredentials = CredentialsCollection.fromJSON(JSON.stringify(olCredentialsMockup));

const aTask = Task.mockup();
const olTasks = TasksCollection.mockup();

const olAdminCommunities = [];

const aCommunity = Community.mockup();

const olAllCommunities = [1,2,3,4,5,6,7].map((t) => {
  let o = Community.mockup();
  o.uid = o.uid+t;
  o.name = o.name+` ${t}`;
  o.countMembers = t;
  o.countCredentials = t;
  return o; 
});

const olMyCommunities = [1,2,3].map((t) => {
  let o = Community.mockup();
  o.uid = o.uid+t;
  o.name = o.name+` ${t}`;
  o.countMembers = (t)+100;
  o.countCredentials = (t)+20;
  return o; 
});

const aProfile = Person.mockup();

const aAdminCommunity = Community.mockup();
