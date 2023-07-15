import { noActions } from "~/controllers/no-actions";
import { requestOtp, login } from "~/controllers/sessions-controller";
import { signUp, updateProfile } from "~/controllers/persons-controller";

const mutationHandlers = {
  'no_actions': { fn: noActions, authorize: false },
  'request_otp': { fn: requestOtp, authorize: false },
  'login': { fn: login, authorize: false },
  'sign_up': { fn: signUp, authorize: false },
  'update_profile': { fn: updateProfile, authorize: true },

/*
- [mint_credential]():
- [create_claim](): 
- [update_claim](): // only while in draft state !
- [submit_claim](): // pay for it and submit, no more changes after this
- [join_community]():
- [propose_as_validator](): 
- [register_admined_community]():
- [update_admined_community]():
- [approve_validator]():
- [approve_auditor]():
- [create_master_plan]():
- [update_master_plan]():
- [submit_task](): // no more changes after this
*/  
};

export default mutationHandlers;
