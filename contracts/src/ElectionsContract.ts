import { SmartContract, state, State, method, PublicKey, Bool} from "snarkyjs";
import { Field, UInt32, MerkleMap, MerkleMapWitness, Circuit, CircuitString, Struct } from "snarkyjs";
import { MerkleMapProxy, MerkleMapUpdate } from "./CommunitiesContract.js";

import { ProvableTask } from "./models/provable-tasks.js";
import { ProvableElector } from "./models/nullifier.js";


const zeroRoot = ((): Field => {
  const mt = new MerkleMap();
  mt.set(Field(0), Field(0)); // we set a first NULL key, with a NULL value
  return mt.getRoot(); 
})();


export class ElectionsContract extends SmartContract {
  // the tasks dataset, binded to the Provable Task entity
  // key: task.uid, value: task.hash()
  @state(Field) tasksRoot = State<Field>();

  // a common nullifier we will use in all the voting processes 
  // to avoid double voting and unassigned electors
  // key: hash([personUid,claimUid,nonce?]) value: State
  // where State is 0=UNASSIGNED, 1=ASSIGNED (but not voted), 2=VOTED
  @state(Field) nullifierRoot = State<Field>();

  init() {
    super.init();
    this.tasksRoot.set(zeroRoot);
    this.nullifierRoot.set(zeroRoot);
  }

  /**
   * Check that only the contract deployer can call the method.
   * The deployer will be the Socialcap main account, which will also act
   * as fee payer for most method calls that imply commited roots bookeeping.
   * WARNING: If the Socialcap account changes we need to redeploy the contract.
   */
  @method assertOnlyDeployer() {
    const DEPLOYER_ADDR = "B62qo1gZFRgGhsozfGeqHv9bbkACr2sHA7qRsf4r9Tadk3dHH3Fwwmy";
    let deployer = PublicKey.fromBase58(DEPLOYER_ADDR);
    this.sender.assertEquals(deployer);
  }

  /**
   * Checks that the given update (key and leaf data after and before) 
   * efectively belong to the commited Merkle Map.
   */
  @method checkMerkleUpdate(
    // map: MerkleMapProxy,
    key: Field, hashed: Field,
    map: MerkleMapProxy,
    witness: MerkleMapWitness,
    updated: MerkleMapUpdate,
    currentRoot: Field,
  ) {
    // check the initial state matches what we expect
    const [ previousRoot, previousKey ] = witness.computeRootAndKey(
      updated.beforeLeaf.hash
    );

    // check root is correct and match the Witness
    previousRoot.assertEquals(currentRoot);
    Circuit.log("Circuit.log previousRoot=", previousRoot);

    // check the updated keys we have used are correct and match the Witness
    previousKey.assertEquals(updated.afterLeaf.key);
    Circuit.log("Circuit.log previousKey=", previousKey);
    Circuit.log("Circuit.log equals afterLeaf.key=", updated.afterLeaf.key);

    // check the key corresponds with this entity UID
    previousKey.assertEquals(key);
    Circuit.log("Circuit.log previousKey=", previousKey);

    // check the new leaf hash matchs the hashed Entity struct
    updated.afterLeaf.hash.assertEquals(hashed);
    Circuit.log("Circuit.log hash=", hashed);

    // compute the new root for the existent key and hash using the given Witness 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ newRoot, _ ] = witness.computeRootAndKey(
      updated.afterLeaf.hash
    );

    // check the newRoot matchs the MerkleMapProxy root
    map.root.assertEquals(newRoot) ; 

    // and the updated root
    updated.afterRoot.assertEquals(newRoot);
  }


  @method updateTask(
    task: ProvableTask,
    map: MerkleMapProxy,
    witness: MerkleMapWitness,
    updated: MerkleMapUpdate
  ) {
    const currentRoot = this.tasksRoot.get();
    this.tasksRoot.assertEquals(currentRoot);

    // assertOnlyDeployer();

    this.checkMerkleUpdate(
      task.key(), task.hash(),
      map, witness, updated,
      currentRoot,
    )
    
    // set the new root
    this.tasksRoot.set(updated.afterRoot);
    Circuit.log("Circuit.log newRoot=", updated.afterRoot);
  }


  @method updateNullifier(
    elector: ProvableElector,
    map: MerkleMapProxy,
    witness: MerkleMapWitness,
    updated: MerkleMapUpdate
  ) {
    const currentRoot = this.nullifierRoot.get();
    this.nullifierRoot.assertEquals(currentRoot);

    // assertOnlyDeployer();

    this.checkMerkleUpdate(
      elector.key(), elector.hash(),
      map, witness, updated,
      currentRoot,
    )
    
    // set the new root
    this.nullifierRoot.set(updated.afterRoot);
    Circuit.log("Circuit.log newRoot=", updated.afterRoot);
  }
}
