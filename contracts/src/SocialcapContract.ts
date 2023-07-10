import { Field, SmartContract, state, State, method, MerkleMap, MerkleMapWitness, Circuit } from "snarkyjs";
import { MerkleMapUpdate, LeafInstance, MerkleMapProxy } from "./lib/offchain-storage.js";
import { ProvableCommunity } from "./models/provable-community.js";
import { ProvablePerson } from "./models/provable-person.js";
import { ProvableMember } from "./models/provable-member.js";


const zeroRoot = ((): Field => {
  const mt = new MerkleMap();
  mt.set(Field(0), Field(0)); // we set a first NULL key, with a NULL value
  return mt.getRoot(); 
})();


export class SocialcapContract extends SmartContract {
  // To commit to data, with the ability to "reveal" it later
  @state(Field) communitiesRoot = State<Field>();
  @state(Field) personsRoot = State<Field>();
  @state(Field) membersRoot = State<Field>();
  @state(Field) claimsRoot = State<Field>();
  @state(Field) tasksRoot = State<Field>();
  @state(Field) credentialsRoot = State<Field>();

  init() {
    super.init();
    this.communitiesRoot.set(zeroRoot);
    this.personsRoot.set(zeroRoot);
    this.claimsRoot.set(zeroRoot);
    this.tasksRoot.set(zeroRoot);
    this.membersRoot.set(zeroRoot);
    this.credentialsRoot.set(zeroRoot);
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
    Circuit.log("Circuit.log newRoot=", updated.afterRoot);
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
