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
  olAdminedCommunities, olMasterPlans,olPersons,
  olAdminedValidators, 
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

const olMasterPlans = [1,2,3,4].map((t) => {
  let mp = MasterPlan.mockup();
  mp.name = mp.name+` mp${t}`;
  mp.uid = mp.uid+`_mp${t}`;
  return mp;
})

const aClaim = Claim.mockup();
const olClaimables = ClaimablesCollection.mockup();
const olSubmitedClaims = ClaimsCollection.fromJSON(JSON.stringify(olSubmitedClaimsMockup));

const aCredential = CapCredential.fromJSON(JSON.stringify(aCredentialMockup));
const olCredentials = CredentialsCollection.fromJSON(JSON.stringify(olCredentialsMockup));

const aTask = Task.mockup();

const olTasks = [1,2,3,4].map((t) => {
  let o = Task.mockup();
  o.uid = o.uid+t;
  return o; 
});

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

const olPersons = [1,2,3,4,5,6].map((t) => {
  let p = Person.mockup();
  p.fullName = "Person "+t;
  return p;
})

const aAdminCommunity = Community.mockup();

const olAdminedCommunities = [1,2].map((t) => {
  let o = Community.mockup();
  o.uid = o.uid+t;
  o.name = o.name+` ADMINED ${t}`;
  o.countMembers = (t)+100;
  o.countCredentials = (t)+20;
  return o; 
});

const olAdminedValidators = [1,2,3,4,5,6,7,8].map((t) => {
  let p = Person.mockup() as any
  p.fullName = "Person "+t;
  p.uid = p.uid+`_${t}`;
  p.state = "APPLIED"; // applied as validator, but not yet approved
  p.appliedUTC = "2023-01-07 15:00";
  return p;
})
