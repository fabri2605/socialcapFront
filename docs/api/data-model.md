## Introduction

We divide the modeling in three groups, which we detail below:

- Accounts (on-chain data)
- Merkle Maps (off-chain data)
- DB entities (off-chain data)

### Accounts

This are strict MINA accounts which hold on-chain state. All state referenced here is backed by a MerkleMap root commitment (or actual values), assuring the off-chain data reflects the on-chain commitment. 

**The Root Account**

This is the main account, managed by the `RootsContract` SmartContract, with the following state fields:
~~~
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
~~~

**Community Account**

A standard MINA account binded to a `Community` entity in the system. We don’t add any fields to these account, as they will be treated as normal MINA accounts. They will be managed with a Wallet owned by the corresponding Community admin, so we can transfer funds to it.

**User Account** 

A standard MINA account binded to a `Person` (user) entity in the system. They can be Members, Validators or Auditors. A given user may have more than one or more roles. We don’t add any fields to these accounts, as they will be treated as normal MINA accounts. They will be managed with a Wallet owned by the Person, so we can transfer funds to it.

**Claim Account** 

Each Claim has its own account, created by the Mediator Service when someone submites a new claim. This Claim is maneged by the `VotingContract` SmartContract which implements the voting process, and has the following state fields:

~~~
  // associated claim (referenced in Root contract on claimsRoots dataset)
  @state(Field) claimUid = State<Field>(); 

  // current voting status
  // total votes is the sum of this three
  @state(Field) positive = State<Field>(); 
  @state(Field) negative = State<Field>(); 
  @state(Field) ignored = State<Field>(); 

  // end conditions
  // if we have at least 'requiredVotes' the election is finished
  // if we have at least 'requiredPositive' votes the claim is approved
  @state(Field) requiredVotes = State<Field>(); 
  @state(Field) requiredPositives = State<Field>(); 

  // final result 0: VOTING, 1: APPROVED, 2: REJECTED, 3: CANCELED
  @state(Field) result = State<Field>(); 
~~~

**Credential Account** 

Each Credential has its own account, created by the Mediator Service when a given Claim is approved, with following state fields:
~~~
NOT FULLY DEFINED YET ...
applicantAddress: Field
claimAddress: Field
issuedOn: Field
validTo: Field
~~~

Set `ZkappUri `

IDEAS: The idea of this account is to act as a "sort of" inmutable and soulbounded contract (HOW ?), fixed at approval time. The contract can also keep track of the validity time of this credential and other needed data. Verifiable ?

NOTES: who will be the deployer ? Socialcap or the applicant.


## Merkle Maps (offchain)

We use the following MerkleMaps linked to the `RootsContract` states:
~~~
  @state(Field) communitiesRoot = State<Field>();
  @state(Field) personsRoot = State<Field>();
  @state(Field) membersRoot = State<Field>();
  @state(Field) claimsRoot = State<Field>();
  @state(Field) tasksRoot = State<Field>();
  @state(Field) credentialsRoot = State<Field>();
~~~

**Design decisions**: 

1) **No arrays**: to avoid problems and because it is difficult to deal with dynamic arrays in SnarkyJS (at least for now) we DO NOT include arrays in any of the structs we attest with MerkleMaps.

2) **toJSON and fromJSON methods**: these are needed in all entities, because serializing and deserializing using standard JSON is not possible, as we need to include only Provable fields in the structure.

3) **Only relevant attributes**: only some of the attributes of the DB entity may be mapped to this Provable struct. It is a careful balance we must take to include all relevant fields, but no more. There may be additional info in the DB entity that is not crucial, and so may not be here. 

4) **UUID and accountId**: 

### Community MerkleMap

Binded to the Community DB Entity.

Each leaf in this MerkleMap contains:

- **key**: the entity `uid`
- **hash**: a hash of the following community properties:
  
    ~~~
      uid: Field,
      state: CircuitString, 
      accountId: PublicKey,
      adminUid: Field // for now we just allow one addmin
      name: CircuitString,
      description: CircuitString,
      image: CircuitString,
      createdUTC: Field,
      updatedUTC: Field,
      approvedUTC: Field,
    ~~~

### Person MerkleMap

Binded to the Person DB Entity.

Each leaf in this MerkleMap contains:

- **key**: the Person `uid`
- **hash**: a hash of the following community properties:
  
    ~~~
      uid: Field,
      state: CircuitString, 
      accountId: PublicKey,
      fullName: CircuitString,
      description: CircuitString,
      image: CircuitString,
      telegram: CircuitString,
      email: CircuitString,
      phone: CircuitString,
      createdUTC: Field,
      updatedUTC: Field,
      approvedUTC: Field,
    ~~~

### Member MerkleMap

Binded to the N-M relation _Person is member of Community_, _Person is a validator in Community_ and _Person is an auditor in Community_.

Each leaf in this MerkleMap contains:

- **key**: a hash of `[communityUid,personUid]`
- **hash**: status Field which will be '0' if not a member, '1' if it is a member,  '2' if it is a validator and '3' if it is an auditor (all validators are members, and all auditors are validators).

With this we can verify easily if certain person is a member, and if its also a validator or an auditor in a given community.


### Claims MerkleMap

Binded to the Claim DB Entity.

Each leaf in this MerkleMap contains:

- **key**: the Claim `uid`
- **hash**: a hash of the following community properties:
  
    ~~~
      uid: Field,
      state: CircuitString, 
      accountId: PublicKey, // the address of the deployed VotingContract for this claim
      fullName: CircuitString,
      description: CircuitString,
      image: CircuitString,
      telegram: CircuitString,
      email: CircuitString,
      phone: CircuitString,
      createdUTC: Field,
      updatedUTC: Field,
      approvedUTC: Field,
    ~~~

### Tasks MerkleMap

Binded to the N-M relation _Person has assigned Task_.

Each leaf in this MerkleMap contains:

- **key**: a hash of `[personUid, taskUid]`
- **hash**: status Field which will be '0' if not assigned, '1' if assigned but pending,  '2' if ignored/rejected, and '3' if completed.

With this we can verify easily if certain person has been assigned, pending or completed a certain task.


## DB Entities (off-chain)


### PlanStrategy

The voting strategy setup for this plan.

- name: name for this strategy, ex: FullAnonymousVoting, RandomAnonymousValidators, NominatedValidators

- min_validators: minimum number/percentage of validators needed for a given claim. 

- min_votes: minimum number/percentage of votes needed to finish the claim. 

- min_positive_votes: minimum number/percentage of positive votes needed to approve the claim.

- min_auditors: number/percentage of auditors to be assigned to a particular claim (can be 0).

- frequency: how frequent (1 every N claims) to add auditors to the Claim (can be 0).

We will consider some basic strategies for now, but increase them latter. Some cases:

- _RandomAnonymousValidators_ is **the usual strategy** we have already described elsewhere. 

- _FullAnonymousVoting_ can be used to implement a credential that requires all members to vote.

- _NominatedValidators_ can be used to only assign certain named validators to a claim type, for example when some course teacher(s) must approve the credential. This probably can be resolved by using the personal tags and the plan tags to match the required validators.

### Claim

- id
- applicant_id
- plan_id
- state
- started_utc:
- voted_utc:
- issued_utc:
- total_votes:
- positive_votes:
- negative_votes:
- ignore_votes:
- evidence_data:
- evidence_files: the list of evidence files
- encryption: how the evidence data and files is encrypted

### Credential

### Tag

### Role

### Plan

### File
