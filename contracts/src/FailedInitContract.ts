import { SmartContract, state, State, method, MerkleMap, Poseidon, Reducer, MerkleMapWitness } from "snarkyjs";
import { Field, Int64, UInt32, Bool, Struct, Circuit } from "snarkyjs";

class Votes extends Struct({
  total: UInt32,
  positive: UInt32,
  negative: UInt32,
  ignored: UInt32
}){}

export class FailedInitContract extends SmartContract {
  // Account states
  @state(Field) claimUid = State<Field>(); //1
  @state(Votes) votes = State<Votes>(); // 4
  @state(Field) result = State<Field>(); //1
  @state(Field) actionsState = State<Field>(); //1
  @state(Field) nullifierRoot = State<Field>();

  init() {
    super.init();
    this.claimUid.set(Field(0));
    this.votes.set({
      total: new UInt32(0), 
      positive: new UInt32(0), 
      negative: new UInt32(0), 
      ignored: new UInt32(0)
    });
    this.result.set(Field(0));
  }

  @method sendVote(electorUid: Field) {
    let claimUid = this.claimUid.get();
    this.claimUid.assertEquals(claimUid);
  }
}