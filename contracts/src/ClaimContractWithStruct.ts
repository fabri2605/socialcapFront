import { SmartContract, state, State, method, MerkleMap, Poseidon, Reducer, MerkleMapWitness } from "snarkyjs";
import { Field, Int64, UInt32, Bool, Struct, Circuit } from "snarkyjs";
// import { MerkleMapUpdate, LeafInstance, MerkleMapProxy } from "./lib/offchain-storage.js";
//import { ProvableCommunity } from "./models/provable-community.js";
//import { ProvablePerson } from "./models/provable-person.js";
//import { ProvableMember } from "./models/provable-member.js";


const zeroRoot = ((): Field => {
  const mt = new MerkleMap();
  mt.set(Field(0), Field(0)); // we set a first NULL key, with a NULL value
  return mt.getRoot(); 
})();

class Votes extends Struct({
  total: UInt32,
  positive: UInt32,
  negative: UInt32,
  ignored: UInt32
}){}

class EndConditions extends Struct({
  votes: UInt32, // if we have at least the votes election is finished
  positives: UInt32 // if we have this positive votes claim is approved
}) {}

class VoteAction extends Struct({
  isValid: Bool,
  positive: Bool,
  negative: Bool,
  ignore: Bool,
}) {}

class NullifierProxy extends Struct({
  root: Field,
  witness: MerkleMapWitness
}) {
  static key(electorUid: Field, claimUid: Field): Field {
    return Poseidon.hash([electorUid, claimUid])
  } 
}

// Voting states for an Elector on this Claim
const 
  NOT_ASSIGNED = Field(0),
  PENDING = Field(1),
  VOTED = Field(2);


export class ClaimContract extends SmartContract {
  // events to update Nullifier
  events = {
    'nullify-voter': Field,
    'updated-voting-status': Field
  };

  // the "reducer" field describes a type of action that we can dispatch, and reduce later
  reducer = Reducer({ actionType: VoteAction });

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
    // this.required.set({
    //   votes: new UInt32(0), 
    //   positives: new UInt32(0), 
    // });
    this.result.set(Field(0));
  }


  @method assertHasNotVoted(
    // map: MerkleMapProxy,
    electorUid: Field,
    claimUid: Field,
    nullifier: NullifierProxy
  ) {
    // compute the new root for the existent key and hash using the given Witness 
    const [ newRoot, newKey ] = nullifier.witness.computeRootAndKey(
      PENDING /* WAS ASSIGNED BUT NOT VOTED YET */
    );

    // check the newRoot matchs the Nullifier root
    nullifier.root.assertEquals(newRoot) ; 

    // check the newKey matchs the given key
    const key: Field = NullifierProxy.key(electorUid, claimUid);
    newKey.assertEquals(key);
  }


  @method sendVote(
    electorUid: Field,
    vote: Int64, // +1 positive, -1 negative or 0 ignored
    nullifier: NullifierProxy,
    required: EndConditions
  ) {
    const claimUid = this.claimUid.get();
    this.claimUid.assertEquals(claimUid);

    // check that the elector has not voted on this claim before
    this.assertHasNotVoted(electorUid, claimUid, nullifier);

    // get current votes state
    let votes = this.votes.get();
    this.votes.assertEquals(votes);

    // get current end conditions
    //let required = this.required.get();
    //this.required.assertEquals(required);
    
    // check that we have not already finished 
    // and that we can receive additional votes
    votes.total.lessThanOrEqual(required.votes);

    // send event to change this elector state in Nullifier
    let key: Field = NullifierProxy.key(electorUid, claimUid);
    this.emitEvent("nullify-voter", key);

    // dispatch action
    this.reducer.dispatch({ 
      isValid: Bool(true),
      positive: Circuit.if(vote.equals(1), Bool(true), Bool(false)),
      negative: Circuit.if(vote.equals(-1), Bool(true), Bool(false)),
      ignore: Circuit.if(vote.equals(0), Bool(true), Bool(false))
    });  
  }


  @method rollupVotes(
    required: EndConditions
  ) {
    const claimUid = this.claimUid.get();
    this.claimUid.assertEquals(claimUid);

    // get current votes state
    let votes = this.votes.get();
    this.votes.assertEquals(votes);

    // get current end conditions
    //let required = this.required.get();
    //this.required.assertEquals(required);
    
    // check that we have not already finished 
    // and that we can receive additional votes
    votes.total.lessThanOrEqual(required.votes);
    Circuit.log("rollupVotes required,total=", required.votes, votes.total);
    
    // get the point in history where we left the last rollup
    let actionsState = this.actionsState.get();
    this.actionsState.assertEquals(actionsState);
    Circuit.log("rollupVotes actionsState=", actionsState);
    
    // get all votes not counted since last rollup
    let pendingVotes = this.reducer.getActions({
      fromActionState: actionsState,
    });
    Circuit.log("rollupVotes pendingVotes.length=", pendingVotes.length);

    let { 
      state: newVotes, 
      actionState: newActionsState 
    } = this.reducer.reduce(
      pendingVotes, // pending votes to reduce
      Votes,        // the state type
      function (    // function that says how to apply the action
        state: Votes, 
        action: VoteAction
      ) {
        // if is a valid vote then sum votes ... 
        state.total = Circuit.if(action.isValid, state.total.add(1), state.total);
        state.positive = Circuit.if(action.isValid && action.positive, state.positive.add(1), state.positive);
        state.negative = Circuit.if(action.isValid && action.negative, state.negative.add(1), state.negative);
        state.ignored = Circuit.if(action.isValid && action.ignore, state.ignored.add(1), state.ignored);
        return state;
      },
      { state: votes, actionState: actionsState } // initial state and actions point
    );

    // update on-chain state
    this.votes.set(newVotes);
    this.actionsState.set(newActionsState);

    // check if we have met end voting conditions
    let isFinished = votes.total.greaterThan(required.votes);
    let isApproved = votes.positive.greaterThanOrEqual(required.positives);
         
    // asert result before changing state
    let result = this.result.get();
    this.result.assertEquals(result);

    // now evaluate final result
    result = Circuit.if(isFinished, 
        Circuit.if(isApproved, Field(1)/*APPROVED*/, Field(2)/*REJECTED*/),
        result);

    // update final on-chain result state
    this.result.set(result);

    // and send event with actual result, even if it is not yet finished
    this.emitEvent("updated-voting-status", result);
  }
}
