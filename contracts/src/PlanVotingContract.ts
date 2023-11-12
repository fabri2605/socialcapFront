import { SmartContract, state, State, method, Reducer, PublicKey, MerkleTree } from "snarkyjs";
import { Field, Bool, Struct, Circuit, Poseidon } from "snarkyjs";
import { MerkleMapWitness } from "snarkyjs";
import { MerkleMapProxy, MerkleMapUpdate } from "./CommunitiesContract.js";

export {
  VotesBatch, PlanElectorsNullifierProxy, PlanVotingContract
}

/** States of the Voting process */
const 
  ACTIVE = 1,
  ENDED = 2,
  CANCELED = 3;

/**
 * This is an actual batch of votes sent by a given elector, on a given
 * voting process (the planUid represents this voting process).
 */
class VotesBatch extends Struct({
  communityUid: Field, // the community where the voting process is happening
  planUid: Field, // the Master Plan Uid of the credential being voted
  electorUid: Field, // the elector Uid who submitted this batch
  batchUid: Field, // an unique Uid for this batch
  batchComittment: Field, // the Root of the batch MerkleTree
  size: Field, // Total number of votes received in this batch
  submitedUTC: Field 
}){}

/**
 * This action will be dispatched by the receiveVotesBatch @method
 * when a new batch of votes is received. We use "actions" here because
 * we want this to be settled in MINA archive nodes.
 */
class VotesBatchReceivedAction extends VotesBatch {}

/**
 * This event will be dispatched by the receiveVotesBatch @method
 * when a new batch of votes is received. It is assumed it will
 * be consumed by some off chain process.
 */
class VotesBatchReceivedEvent extends VotesBatch {}


/** Voting states for an Elector on this voting Plan */
const 
  UNASSIGNED = Field(0), // not assigned to this elector
  ASSIGNED = Field(1),   // assigned to elector but has not voted yet
  VOTED = Field(2);      // assigned to elector and has already voted


class PlanElectorsNullifierProxy extends Struct({
  root: Field,
  witness: MerkleMapWitness
}) {
  static key(electorId: PublicKey, planUid: Field): Field {
    Circuit.log(electorId, planUid)
    const keyd = Poseidon.hash(
      electorId.toFields()
      .concat(planUid.toFields())
    );
    Circuit.log("Key (",electorId, planUid, ") =>", keyd)
    return keyd;
  } 
}


/**
 * This is the voting contract binded to a given credential voting process, which
 * is represented by its master plan.
 * 
 * It manages all votes batches received from electors, emit actions on each 
 * batch, and finally commit all received batches. 
 * 
 * This contract mainly asserts that the electors voted and dispatched their 
 * batches. We can not know if some electors did not dispatch them, this may 
 * be validated in other parts (such as the UI or the API)
 */
class PlanVotingContract extends SmartContract {
  // events to update VotingBatchesMerkleTree
  events = {
    'votes_batch_received': VotesBatchReceivedEvent 
  };

  // the "reducer" field describes a type of action that we can dispatch, and reduce later
  reducer = Reducer({ actionType: VotesBatchReceivedAction });

  // associated MasterPlan. This is the voting process Uid 
  // and is binded to a given Credentials voting process.
  @state(Field) planUid = State<Field>(); 

  // associated Community where voting took place
  @state(Field) communityUid = State<Field>(); 

  // current Voting Batches MerkleTree commitment
  @state(Field) batchesCommitment = State<Field>(); 

  // final state of the voting process // 2: FINISHED, 1: ACTIVE
  @state(Field) votingState = State<Field>(); 

  // helper field to store the actual point in the actions history
  @state(Field) actionsState = State<Field>(); 

  init() {
    super.init();
    this.planUid.set(Field(0));
    this.communityUid.set(Field(0));
    this.batchesCommitment.set(Field(0));
    this.votingState.set(Field(ACTIVE)); // it starts as an active voting
    this.actionsState.set(Reducer.initialActionState); // TODO: is this the right way to initialize this ???
  }


  @method assertIsValidElector(
    /**
     * Checks if the given elector has been assigned to this voting process
     */
    electorPuk: PublicKey,
    planUid: Field,
    nullifier: PlanElectorsNullifierProxy
  ) {
    // compute a root and key from the given Witness using the only valid 
    // value ASSIGNED, other values indicate that the elector was 
    // never assigned to this claim or that he has already voted on it
    const [witnessRoot, witnessKey] = nullifier.witness.computeRootAndKey(
      ASSIGNED /* WAS ASSIGNED */
    );
    Circuit.log("assertIsValidElector witnessRoot", witnessRoot);
    Circuit.log("assertIsValidElector witnessKey", witnessKey);

    // check the witness obtained root matchs the Nullifier root
    nullifier.root.assertEquals(witnessRoot, "Invalid elector root") ;

    // check the witness obtained key matchs the elector+claim key 
    const key: Field = PlanElectorsNullifierProxy.key(electorPuk, planUid);
    Circuit.log("assertIsValidElector recalculated Key", key);

    witnessKey.assertEquals(key, "Invalid elector key");
  }
  

  @method receiveVotesBatch(
    votesBatch: VotesBatch,
    nullifier: PlanElectorsNullifierProxy
  ) {
    /**
     * Receives a VotesBatch, asserts it, and emits an Action and en Event
     */
    const planUid = this.planUid.getAndAssertEquals();
    const communityUid = this.communityUid.getAndAssertEquals();
    const votingState = this.votingState.getAndAssertEquals();

    // assert the batch corresponds to this community and plan
    communityUid.assertEquals(votesBatch.communityUid);
    planUid.assertEquals(votesBatch.planUid);

    // the elector Pub key is the one sending the Tx
    let electorPuk = this.sender;
    electorPuk.assertEquals(this.sender);
    
    // check this elector is part of the Electors set 
    Circuit.log("sendVote key=", PlanElectorsNullifierProxy.key(electorPuk, planUid));
    this.assertIsValidElector(electorPuk, planUid, nullifier);

    // check that we have not already finished 
    // and that we can receive additional batches
    votingState.assertEquals(ACTIVE);

    // dispatch action
    const action: VotesBatchReceivedAction = votesBatch;
    this.reducer.dispatch(action);  
    Circuit.log("dispatched action", action);

    // send event to change this elector state in Nullifier
    this.emitEvent("votes_batch_received", votesBatch);
  }


  @method rollupAllBatches(
    map: MerkleMapProxy,
    witness: MerkleMapWitness,
    updated: MerkleMapUpdate
  ) {
    const planUid = this.planUid.getAndAssertEquals();
    const communityUid = this.communityUid.getAndAssertEquals();
    const votingState = this.votingState.getAndAssertEquals();

    // check that this claim is still open (in the voting process)
    votingState.assertEquals(ACTIVE, "Voting has already finished !");
    
    // get the point in history where we left the last rollup
    let actionsState = this.actionsState.get();
    this.actionsState.assertEquals(actionsState);
    Circuit.log("rollupBatches actionsState=", actionsState);
    
    // get all votes not counted since last rollup
    let pendingBatches = this.reducer.getActions({
      fromActionState: actionsState,
    });
    Circuit.log("rollupBatches pendingBatches.length=", pendingBatches.length);

//     // build Voting initial state for Reducer
//     let votingState: Votes = {
//       total: votes,
//       positive: positives,
//       negative: negatives,
//       ignored: ignored,
//     };
// 
//     let { 
//       state: newVotes, 
//       actionState: newActionsState 
//     } = this.reducer.reduce(
//       pendingVotes, // pending votes to reduce
//       Votes,        // the state type
//       function (    // function that says how to apply the action
//         state: Votes, 
//         action: VoteAction
//       ) {
//         // we can use a reducer here because it is not important if votes arrive 
//         // in different order than the one they were emited. we just need more
//         // than the total required votes to be done
//         Circuit.log("---");
//         Circuit.log("reducer action=", action);
//         Circuit.log("reducer before state=", state);
//         const notFinished = state.total.lessThan(requiredVotes);
//         const mustCount = notFinished.and(action.isValid);
//         Circuit.log("reducer notFinished=", notFinished, "isValid=", action.isValid, " mustCount=", mustCount);
//         state.total = Circuit.if(mustCount, state.total.add(1), state.total);
//         state.positive = Circuit.if(mustCount.and(action.positive), state.positive.add(1), state.positive);
//         state.negative = Circuit.if(mustCount.and(action.negative), state.negative.add(1), state.negative);
//         state.ignored = Circuit.if(mustCount.and(action.ignore), state.ignored.add(1), state.ignored);
//         Circuit.log("reducer after state=", state);
//         return state;
//       },
//       { state: votingState, actionState: actionsState } // initial state and actions point
//     );
//     Circuit.log("reducer final state=", newVotes);
// 
//     // update on-chain voting and actions state
//     this.actionsState.set(newActionsState);
//     this.positive.set(newVotes.positive);
//     this.negative.set(newVotes.negative);
//     this.ignored.set(newVotes.ignored);
// 
//     // check if we have met end voting conditions
//     let isFinished = newVotes.total.greaterThanOrEqual(requiredVotes);
//     let isApproved = newVotes.positive.greaterThanOrEqual(requiredPositives);
//          
//     // assert result before changing its value
//     let result = this.result.get();
//     this.result.assertEquals(result);
// 
//     // now evaluate final result
//     let newResult = Circuit.if(isFinished, 
//       Circuit.if(isApproved, APPROVED, REJECTED),
//       result
//     );
// 
//     // update final on-chain result state
//     this.result.set(newResult);
// 
//     // check if it has changed so we can report it with the event
//     let resultHasChanged = newResult.greaterThan(result);
// 
//     // and send event with actual result, even if it is not yet finished
//     // TODO: can we use an if condition here? I think it cant be done
//     this.emitEvent("voting-changed", {
//       claimUid: claimUid,
//       isFinished: isFinished,
//       hasChanged: resultHasChanged,
//       result: result,
//       total: newVotes.total,
//       positive: newVotes.positive,
//       negative: newVotes.negative,
//       ignored: newVotes.ignored
//     });
// 
//     Circuit.log("rollupClaims result=", newResult);
//     Circuit.log("rollupClaims isFinished=", isFinished);
//     Circuit.log("rollupClaims isApproved=", isApproved);
  }
}
