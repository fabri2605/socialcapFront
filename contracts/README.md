# Contracts folder

All MINA contracts code must be here.

They will be published to NPM and must be compiled and deployed separate from the UI, so it has no sense to keep them in the frontend folder.

IMPORTANT: to be discussed how :-)

## Contracts

### Socialcap

Is the root contract which holds the Merkle Map roots of:

- communities: the list of all registered communities 
- persons: the listo of all users who registered, which may or may no belong to a community.
- claims: the list of all claims eithert approved or in process
- tasks: the running voting tasks assigned to validators and auditors

~~~
export class DAOFactory extends SmartContract {
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

  ...
  updateCommunity(...)

  updatePerson(...)

  updateClaim(...)

  updateTask(...)
}
~~~

### ClaimVoting 

Is the claims voting contract, to be discussed yet.
