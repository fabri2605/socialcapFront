import { Field, SmartContract, state, State, method, Struct, PublicKey } from 'snarkyjs';

class Dao extends Struct({
	publicKey: PublicKey,
	admins: [PublicKey],
	validators: [PublicKey],
	validated: Boolean,
}) {
	addAdmin(admin_: PublicKey) {

	}

	addValidator(validator_: PublicKey) {

	}

	deleteAdmin(admin_: PublicKey) {

	}

	deleteValidator(validator_: PublicKey) {

	}

	validate() {

	}
}

export class DAOFactory extends SmartContract {
	// @state(Field) num = State<Field>();
	@state(Field) daoArray = Array(Dao);

	init() {
		super.init();
		// this.num.set(Field(1));
	}

	@method createDAO(admins_: [], validators_: []) {
		let newDAO = new Dao({
			publicKey: new PublicKey,
			admins: admins_,
			validators: validators_,
			validated: false,
		})

		//this.daoArray.fill(newDAO);

		// this.num.assertEquals(currentState); // precondition that links this.num.get() to the actual on-chain state
		// const newState = currentState.add(2);
		// this.num.set(newState);
	}
}
