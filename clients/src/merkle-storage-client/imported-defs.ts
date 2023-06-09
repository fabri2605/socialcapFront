import { 
  Field, 
  MerkleMapWitness 
} from "snarkyjs";
import { 
  LeafInstance, 
  MerkleMapUpdate 
} from "../../../api/merkle-storage-server/src/storage/index.js";

type MerkleMapProxy = {
  id: number,
  name: string;
  root: Field,
  count: number
};

export {
  LeafInstance,
  MerkleMapUpdate,
  MerkleMapProxy
}
