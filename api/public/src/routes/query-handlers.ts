import { queryEmptySet } from "~/controllers/empty-set"

const queryHandlers = {
  'get_empty_set': { fn: queryEmptySet, authorize: false }
};

export default queryHandlers;
