import { queryEmptySet } from "./empty-set"

const queryHandlers = {
  'get_empty_set': { fn: queryEmptySet, authorize: false }
};

export default queryHandlers;
