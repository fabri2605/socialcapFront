## Introduction

The entities described below are preliminary versions (to be fixed during developing) of how are we going to model the different entities in the MINA blockchain:

**- The DAO Account:** This is the main account managed by the Mediator Service, with fields “communitiesMTRoot”, “adminsMTRoot”, and “validatorsMTRoot".

**- Community Account**: Each Community has its own account, created by the Mediators Services when someone adds a new community, with fields “adminsMTRoot”, “validatorsMTRoot”, “auditorsMTRoot” and “claimsMTRoot”.

**- User Account**: A standard MINA account representing a user in the system. They can be Applicants, Validators, Admins or Auditors. A given user may have more than one or more roles. We don’t add any fields to these accounts, as they will be treated as normal MINA accounts, managed with a Wallet.

**- Claim Account:** Each Claim has its own account, created by the Mediator Service when someone adds a new claim, with fields “applicantID”, “claimType”, “votesMTRoot”, "status" which may contain contains the current status of the claim: “STARTED”, “ASSIGNED”, APPROVED”, “REJECTED”, “CANCELED”, “IGNORED” (will not do), and “evidenceHash”.****

## Entities

### Root

A root container for all data entities, binded to the zkApp.

- id: the MINA account ID
- admins: the list of admins of the App (to allow multisig ?)
- communities: the list of registered communities 

### Community

Each registered community will have a MINA account, so we can transfer funds to it.

- id:  the MINA account ID 
- name:
- description:
- admins: the list of admins of this community (to allow multisig ?)
- members: the list of members of this community
- validators:
- auditors:
- claims: the list of all pending claims
- credentials: the list of all issued credentials
- roles: list of available roles (set by Admin) available in this community
- plans: list of master plans (set by Admin) available in this community 

### Person

Each registered person will have a MINA account, so we can transfer funds to it and he can make payments.

- uid: unique ID assigned by the App on sign up.
- account_id: MINA AccountId of this person
- full_name:
- alias:
- preferences: Map<string, string>
- email:
- telegram:
- discord:
- avatar:
- claims: the list of all pending claims
- credentials: the list of all owned credentials
- tags: personal tags used to filter validators/auditors
- roles: roles assigned by protocol when certain claims are accepted

### Plan

- uid: UID of this master plan
- community_id: AccountId of the community to which this plan belongs.
- name: a title for this claim type
- description: a long descriptions for this claim type
- icon: an icon for this claim type. Not necessary but useful for UI.
- state: A active, E edition, I inactive, X deleted
- evidence_form: a configurable set of form fields and
  instructions for a given claim type. This will be the information to be filled by the applicant and needed to analyze the claim, for
  example: selfies, photos, documents, and other evidence files that can demonstrate
  why the claim is valid, if KYC is required, if a DID is available, the reason for the
  claim, etc.

- instructions_content: instructions to validators/auditors on how to analyze the evidence for this particular
  claim.

- warning_content: legal warns required to inform the applicant and validators of penalties and
  other consequences of bad behavior.
- strategy_id: the voting strategy setup for this plan.
- tags: tags used by the protocol to filter validators and auditors
- roles: roles to be assigned to the Credential when the claim is approved (can be used in Governance).

- fee: to be paid by the applicant when applying for the Credential. It MUST have a minimum value.

- rewards: percentage of the fee to be paid to the validators. Can be 0 if they are volunteers.

Notes:

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
