import { SmartContract, state, State, method, Reducer } from "snarkyjs";
import { Field, Bool, Struct, Circuit, Poseidon } from "snarkyjs";
import { MerkleMapWitness } from "snarkyjs";

class Votes extends Struct({
  total: Field,
  positive: Field,
  negative: Field,
  ignored: Field
}){}

class VoteAction extends Struct({
  isValid: Bool,
  positive: Bool,
  negative: Bool,
  ignore: Bool,
}){}

class NullifierProxy extends Struct({
  root: Field,
  witness: MerkleMapWitness
}) {
  static key(electorUid: Field, claimUid: Field): Field {
    return Poseidon.hash([electorUid, claimUid])
  } 
}

class VotingStatusEvent extends Struct({
  claimUid: Field,
  isFinished: Bool,
  result: Field,
  total: Field,
  positive: Field,
  negative: Field,
  ignored: Field
}) {}

// Voting states for an Elector on this Claim
const 
  NOT_ASSIGNED = Field(0), // Claim was not assigned to this elector
  PENDING = Field(1),      // Claim was assigned to elector, but has not voted yet
  VOTED = Field(2);        // Claim was assigned to elector and has already voted

// Final result states  
const 
  APPROVED = Field(1),
  REJECTED = Field(2);


export class ClaimContract extends SmartContract {
  // events to update Nullifier
  events = {
    'elector-has-voted': Field,
    'voting-changed': VotingStatusEvent
  };

  // the "reducer" field describes a type of action that we can dispatch, and reduce later
  reducer = Reducer({ actionType: VoteAction });

  // associated claim (referenced in Root contract on claimsRoots dataset)
  @state(Field) claimUid = State<Field>(); 

  // current voting status
  // total votes is the sum of this three
  @state(Field) positive = State<Field>(); 
  @state(Field) negative = State<Field>(); 
  @state(Field) ignored = State<Field>(); 

  // end conditions
  // if we have at least 'requiredVotes' the election is finished
  // if we have this at leasr 'requiredPositive' votes the claim is approved
  @state(Field) requiredVotes = State<Field>(); 
  @state(Field) requiredPositives = State<Field>(); 

  // final result 0: Not finished, 1: Approved, 2: Rejected
  @state(Field) result = State<Field>(); 

  // helper field to store the actual point in the action history
  @state(Field) actionsState = State<Field>(); 

  init() {
    super.init();
    this.claimUid.set(Field(0));
    this.positive.set(Field(0));
    this.negative.set(Field(0)); 
    this.ignored.set(Field(0));
    this.requiredVotes.set(Field(0));
    this.requiredPositives.set(Field(0));
    this.result.set(Field(0));
    this.actionsState.set(Reducer.initialActionState); // TODO: is this the right way to initialize this ???
  }

  @method setup(
    claimUid: Field,
    requiredVotes: Field,
    requiredPositives: Field
  ) { 
    // we need to initialize a new claim with the correct params
    this.claimUid.set(claimUid);
    this.requiredVotes.set(requiredVotes);
    this.requiredPositives.set(requiredPositives);
  }

  @method assertHasNotVoted(
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
    vote: Field, // +1 positive, -1 negative or 0 ignored
    nullifier: NullifierProxy
  ) {
    const claimUid = this.claimUid.get();
    this.claimUid.assertEquals(claimUid);

    // check that the elector has not voted on this claim before
    this.assertHasNotVoted(electorUid, claimUid, nullifier);

    // get current votes state
    let positives = this.positive.getAndAssertEquals();
    let negatives = this.negative.getAndAssertEquals();
    let ignored = this.ignored.getAndAssertEquals();
    let votes = Field(0).add(positives).add(negatives).add(ignored);

    // get current end conditions
    let requiredVotes = this.requiredVotes.getAndAssertEquals();
    
    // check that we have not already finished 
    // and that we can receive additional votes
    votes.lessThanOrEqual(requiredVotes);

    // dispatch action
    this.reducer.dispatch({ 
      isValid: Bool(true),
      positive: Circuit.if(vote.greaterThan(0), Bool(true), Bool(false)),
      negative: Circuit.if(vote.lessThan(0), Bool(true), Bool(false)),
      ignore: Circuit.if(vote.equals(0), Bool(true), Bool(false))
    });  

    // send event to change this elector state in Nullifier
    let key: Field = NullifierProxy.key(electorUid, claimUid);
    this.emitEvent("elector-has-voted", key);
  }


  @method rollupVotes() {
    const claimUid = this.claimUid.get();
    this.claimUid.assertEquals(claimUid);

    // get current votes state
    let positives = this.positive.getAndAssertEquals();
    let negatives = this.negative.getAndAssertEquals();
    let ignored = this.ignored.getAndAssertEquals();
    let votes = Field(0).add(positives).add(negatives).add(ignored);

    // get current end conditions
    let requiredVotes = this.requiredVotes.getAndAssertEquals();
    let requiredPositives = this.requiredPositives.getAndAssertEquals();
    
    // check that we have not already finished 
    // and that we can receive additional votes
    votes.assertLessThan(requiredVotes, "Too late, voting has already finished !");
    Circuit.log("rollupVotes votes required,total=", requiredVotes, votes);

    // get the point in history where we left the last rollup
    let actionsState = this.actionsState.get();
    this.actionsState.assertEquals(actionsState);
    Circuit.log("rollupVotes actionsState=", actionsState);
    
    // get all votes not counted since last rollup
    let pendingVotes = this.reducer.getActions({
      fromActionState: actionsState,
    });
    Circuit.log("rollupVotes pendingVotes.length=", pendingVotes.length);

    // build Voting state for Reducer
    let votingState: Votes = {
      total: votes,
      positive: positives,
      negative: negatives,
      ignored: ignored,
    };

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
      { state: votingState, actionState: actionsState } // initial state and actions point
    );

    // update on-chain voting and actions state
    this.actionsState.set(newActionsState);
    this.positive.set(newVotes.positive);
    this.negative.set(newVotes.negative);
    this.ignored.set(newVotes.ignored);

    // check if we have met end voting conditions
    let isFinished = newVotes.total.greaterThanOrEqual(requiredVotes);
    let isApproved = newVotes.positive.greaterThanOrEqual(requiredPositives);
         
    // asert result before changing its value
    let result = this.result.get();
    this.result.assertEquals(result);

    // now evaluate final result
    result = Circuit.if(isFinished, 
        Circuit.if(isApproved, APPROVED, REJECTED),
        result);

    // update final on-chain result state
    this.result.set(result);

    // and send event with actual result, even if it is not yet finished
    this.emitEvent("voting-changed", {
      claimUid: claimUid,
      isFinished: isFinished,
      result: result,
      total: newVotes.total,
      positive: newVotes.positive,
      negative: newVotes.negative,
      ignored: newVotes.ignored
    });
  }
}
