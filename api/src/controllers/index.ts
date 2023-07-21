import { noActions } from "./no-actions.js";
import { requestOtp, login } from "./sessions-controller.js";
import { signUp, updateProfile, getProfile } from "./persons-controller.js";
import { updateCommunity } from "./communities-controller.js";
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
}

const queryHandlers = {
  'get_empty_set': { fn: queryEmptySet, authorize: false },
  'get_profile': { fn: getProfile, authorize: true }
};

