import { noActions } from "./no-actions";

const mutationHandlers = {
  'no_actions': { fn: noActions, authorize: false }
};

export default mutationHandlers;
