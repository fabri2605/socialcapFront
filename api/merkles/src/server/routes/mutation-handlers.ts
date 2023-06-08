import { 
  noActions 
} from "../controllers/no-actions.js";

import { 
  createMerkleMap,
  setMerkleMapLeaf
} from "../controllers/offchain-storage-controller.js";

const mutationHandlers = {
  'no_actions': { fn: noActions, authorize: false },
  'create_merkle_map':  { fn: createMerkleMap, authorize: false },
  'set_merkle_map_leaf':  { fn: setMerkleMapLeaf, authorize: false },
};

export default mutationHandlers;
