import { SmartContract, state, State, method, Reducer, PublicKey } from "o1js";
import { Field, Struct, Circuit, Poseidon } from "o1js";
import { MerkleMapWitness, MerkleMap } from "o1js";
import { MerkleMapUpdate } from "./merkle-updates.js";

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
  electorPubkey: PublicKey, // the elector Uid who submitted this batch
  batchUid: Field, // an unique Uid for this batch
  batchCommitment: Field, // the Root of the batch MerkleTree
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
  static key(
    electorId: PublicKey,
    planUid: Field
  ): Field {
    // Circuit.log(electorId, planUid)
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
    this.batchesCommitment.set(this.zeroRoot());
    this.votingState.set(Field(ACTIVE)); // it starts as an active voting
    this.actionsState.set(Reducer.initialActionState); // TODO: is this the right way to initialize this ???
  }

  zeroRoot(): Field {
    const mt = new MerkleMap();
    mt.set(Field(0), Field(0)); // we set a first NULL key, with a NULL value
    return mt.getRoot(); 
  }

  /**
   * Setup initial values for some state vars. Should be done when 
   * the account is really available, or it will fail.
   */
  @method setup(
    planUid: Field,
    communityUid: Field,
  ) {
    const currentPlanUid = this.planUid.getAndAssertEquals();
    const currentCommunityUid = this.communityUid.getAndAssertEquals();
    this.planUid.set(planUid);
    this.communityUid.set(communityUid);
  }

  /**
   * Checks if the given elector has been assigned to this voting process
   */
  @method assertIsValidElector(
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
  

  /**
   * Receives a VotesBatch, asserts it, and emits an Action and en Event
   */
  @method receiveVotesBatch(
    votesBatch: VotesBatch,
    nullifier: PlanElectorsNullifierProxy
  ) {
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
    Circuit.log("elector key=", PlanElectorsNullifierProxy.key(electorPuk, planUid));
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


  @method commitAllBatches(
    updated: MerkleMapUpdate,
    witness: MerkleMapWitness
  ) {
    const planUid = this.planUid.getAndAssertEquals();
    const communityUid = this.communityUid.getAndAssertEquals();
    const votingState = this.votingState.getAndAssertEquals();
    const batchesCommitment = this.batchesCommitment.getAndAssertEquals();

    // check that this claim is still open (in the voting process)
    votingState.assertEquals(ACTIVE, "Voting has already finished !");

    // compute the new root for the existent key and hash using the given Witness 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ newRoot, newKey ] = witness.computeRootAndKey(
      updated.afterLeaf.hash
    );

    // assert the the updated root and key
    updated.afterLeaf.key.assertEquals(newKey);
    updated.afterRoot.assertEquals(newRoot);

    // close voting batches and set final states
    this.votingState.set(Field(ENDED));
    this.batchesCommitment.set(updated.afterRoot);
    Circuit.log("new commitment=", this.batchesCommitment);
  }
}
