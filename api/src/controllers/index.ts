import { noActions } from "./no-actions.js";
import { requestOtp, login } from "./sessions-controller.js";
import { signUp, updateProfile, getProfile } from "./persons-controller.js";
import { updateCommunity, getCommunity, getMyCommunities, getAllCommunities, joinCommunity } from "./communities-controller.js";
import { queryEmptySet } from "./empty-set.js"

export { 
  queryHandlers,
  mutationHandlers,
};

const mutationHandlers = {
  'no_actions': { fn: noActions, authorize: false },
  'request_otp': { fn: requestOtp, authorize: false },
  'login': { fn: login, authorize: false },
  'sign_up': { fn: signUp, authorize: false },
  'update_profile': { fn: updateProfile, authorize: true },
  'update_community': { fn: updateCommunity, authorize: true },
  'join_community': { fn: joinCommunity, authorize: true },
  //'update_admined_community': { fn: updateAdminedCommunity, authorize: true },
  //'update_plan': {}
  //'update_claim': {}
  //'submit_claim': {}
}

const queryHandlers = {
  'get_empty_set': { fn: queryEmptySet, authorize: false },
  'get_profile': { fn: getProfile, authorize: true },
  'get_community': { fn: getCommunity, authorize: true },
  'get_my_communities': { fn: getMyCommunities, authorize: true },
  'get_all_communities': { fn: getAllCommunities, authorize: true },
  // 'get_my_credentials': {  fn: getClaimables, authorize: true },
  // 'get_my_claims': {  fn: getClaimables, authorize: true },
  // 'get_my_claimables': {  fn: getClaimables, authorize: true },
  // 'get_admined_community':  {  fn: getAdminedCommunity, authorize: true }
};
