import { SmartContract, state, State, method, MerkleMap, MerkleMapWitness, Circuit } from "snarkyjs";
import { Field, UInt32, Bool } from "snarkyjs";
import { MerkleMapUpdate, LeafInstance, MerkleMapProxy } from "./lib/offchain-storage.js";
import { ProvableCommunity } from "./models/provable-community.js";
import { ProvablePerson } from "./models/provable-person.js";
import { ProvableMember } from "./models/provable-member.js";


const zeroRoot = ((): Field => {
  const mt = new MerkleMap();
  mt.set(Field(0), Field(0)); // we set a first NULL key, with a NULL value
  return mt.getRoot(); 
})();


export class RootContract extends SmartContract {

  // the Communities dataset, binded to the Provable Community entity
  // key: community.uid, value: community.hash()
  @state(Field) communitiesRoot = State<Field>();

  // the Persons dataset, binded to the Provable Person entity
  // key: person.uid, value: person.hash()
  @state(Field) personsRoot = State<Field>();

  // the Members dataset, defining a person's role in a given community
  // key: hash([personUid,communityUid,nonce?]), value: Status
  // where Status is 0: NONE, 1: MEMBER, 2: VALIDATOR, 3: AUDITOR
  // NOTE that all validators are members, and all auditors are validators
  @state(Field) membersRoot = State<Field>();

  // the MasterPlans dataset, binded to the Provable MasterPlan entity
  // key: plan.uid, value: plan.hash()
  @state(Field) plansRoot = State<Field>();

  // the Claims dataset, binded to the Provable Claim entity
  // key: claim.uid, value: claim.hash()
  @state(Field) claimsRoot = State<Field>();

  // the Approved Credentials dataset, binded to the Provable Credential entity
  // key: credential.uid, value: credential.hash()
  // NOTE that the the credential uid === the claim uid that claimed it
  @state(Field) credentialsRoot = State<Field>();

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
    this.communitiesRoot.set(zeroRoot);
    this.personsRoot.set(zeroRoot);
    this.plansRoot.set(zeroRoot);
    this.claimsRoot.set(zeroRoot);
    this.tasksRoot.set(zeroRoot);
    this.membersRoot.set(zeroRoot);
    this.credentialsRoot.set(zeroRoot);
    this.nullifierRoot.set(zeroRoot);
  }

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

  @method updateCommunity(
    org: ProvableCommunity,
    map: MerkleMapProxy,
    witness: MerkleMapWitness,
    updated: MerkleMapUpdate
  ) {
    const currentRoot = this.communitiesRoot.get();
		this.communitiesRoot.assertEquals(currentRoot);

    this.checkMerkleUpdate(
      org.key(), org.hash(),
      map, witness, updated,
      currentRoot,
    )
    
    // set the new root
    this.communitiesRoot.set(updated.afterRoot);
    Circuit.log("new communititesRoot=", updated.afterRoot);
  }

  @method updatePerson(
    person: ProvablePerson,
    map: MerkleMapProxy,
    witness: MerkleMapWitness,
    updated: MerkleMapUpdate
  ) {
    const currentRoot = this.personsRoot.get();
		this.personsRoot.assertEquals(currentRoot);

    this.checkMerkleUpdate(
      person.key(), person.hash(),
      map, witness, updated,
      currentRoot,
    )
    
    // set the new root
    this.personsRoot.set(updated.afterRoot);
    Circuit.log("Circuit.log newRoot=", updated.afterRoot);
  }

  updateMember(
    member: ProvableMember,
    map: MerkleMapProxy,
    witness: MerkleMapWitness,
    updated: MerkleMapUpdate
  ) {
    const currentRoot = this.membersRoot.get();
    this.membersRoot.assertEquals(currentRoot);

    this.checkMerkleUpdate(
      member.key(), member.hash(),
      map, witness, updated,
      currentRoot,
    )
    
    // set the new root
    this.membersRoot.set(updated.afterRoot);
    Circuit.log("Circuit.log newRoot=", updated.afterRoot);
  }

  //updateClaim(...)

  //updateTask(...)
}
