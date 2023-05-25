import { noActions } from "~/controllers/no-actions";
import { requestOtp, login } from "~/controllers/sessions-controller";

const mutationHandlers = {
  'no_actions': { fn: noActions, authorize: false },
  'request_otp': { fn: requestOtp, authorize: false },
  'login': { fn: login, authorize: false }
};

export default mutationHandlers;
