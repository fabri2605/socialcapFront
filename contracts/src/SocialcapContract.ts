import {
	AccountUpdate,
	Bool,
	Circuit,
	Field,
	MerkleMap, MerkleMapWitness,
	Mina,
	Poseidon,
	SmartContract,
	state, State,
	method,
	Struct,
	PrivateKey, PublicKey
} from 'snarkyjs';

const zeroCommitment: Field = Field(0);


export class SocialcapContract extends SmartContract {
  // To commit to data, with the ability to "reveal" it later
  @state(Field) communitiesCommitment = State<Field>();
  @state(Field) personsCommitment = State<Field>();
  @state(Field) claimsCommitment = State<Field>();
  @state(Field) tasksCommitment = State<Field>();

  init() {
    super.init();
    this.communitiesCommitment.set(zeroCommitment);
    this.personsCommitment.set(zeroCommitment);
    this.claimsCommitment.set(zeroCommitment);
    this.tasksCommitment.set(zeroCommitment);
  }

  @method addDAO(key_: Field, hash_: Field) {
    //
  }
  
  //updateCommunity(...)

  //updatePerson(...)

  //updateClaim(...)

  //updateTask(...)
}
