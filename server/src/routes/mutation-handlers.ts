import { noActions } from "~/controllers/no-actions";
import { requestOtp, login } from "~/controllers/sessions-controller";
import { signUp } from "~/controllers/persons-controller";

const mutationHandlers = {
  'no_actions': { fn: noActions, authorize: false },
  'request_otp': { fn: requestOtp, authorize: false },
  'login': { fn: login, authorize: false },
  'sign_up': { fn: signUp, authorize: false },
};

export default mutationHandlers;
