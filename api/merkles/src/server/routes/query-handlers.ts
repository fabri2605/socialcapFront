import { 
  queryEmptySet 
} from "../controllers/empty-set.js"

import { 
  getMerkleMap,
  getMerkleMapLeaf,
  getMerkleMapWitness
} from "../controllers/offchain-storage-controller.js";

const queryHandlers = {
  'get_empty_set': { fn: queryEmptySet, authorize: false },
  'get_merkle_map':  { fn: getMerkleMap, authorize: false },
  'get_merkle_map_witness':  { fn: getMerkleMapWitness, authorize: false },
  'get_merkle_map_leaf':  { fn: getMerkleMapLeaf, authorize: false },
};

export default queryHandlers;
