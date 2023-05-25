import { noActions } from "./no-actions";
import { requestOtp } from "./sessions-controller";

const mutationHandlers = {
  'no_actions': { fn: noActions, authorize: false },
  'request_otp': { fn: requestOtp, authorize: false },
  'login': { fn: noActions, authorize: false }
};

export default mutationHandlers;
