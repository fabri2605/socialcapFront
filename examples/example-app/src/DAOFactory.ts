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

import {
	serializeWitness,
	deserializeWitness
} from './mapUtils';

class Community extends Struct({
	publicKey: PublicKey,
	admins: [PublicKey],
	validators: [PublicKey],
	validated: Boolean,
}) {
	addAdmin(admin_: PublicKey) {
		this.admins = this.admins.concat(admin_);
	}

	addValidator(validator_: PublicKey) {
		this.validators = this.validators.concat(validator_);
	}

	deleteAdmin(admin_: PublicKey) {
		this.admins = this.admins.fill(admin_);
	}

	deleteValidator(validator_: PublicKey) {
		this.validators = this.validators.fill(validator_);
	}

	validate() {
		this.validated = true;
	}

	getHash(): Field {
		return Poseidon.hash(
			this.publicKey
				.toFields()
				.concat(Field(String(this.admins)))
				.concat(Field(String(this.validators)))
		);
	}
}


export class DAOFactory extends SmartContract {
	// @state(Field) num = State<Field>();
	// @state(Field) daoArray = Array(Community);

	// To commit to data, with the ability to "reveal" it later
	@state(Field) commitment = State<Field>();

	init() {
		super.init();
		this.commitment.set(zeroCommitment);
	}

	@method addDAO(key_: Field, hash_: Field) {
		// Check the initial state matches the expected
		const initialCommitment = this.commitment.get();
		Circuit.log('initialCommitment:', initialCommitment);
		const rootBefore = Tree.getRoot();
		Circuit.log('rootBefore', rootBefore);

		this.commitment.assertEquals(initialCommitment);
		Circuit.log('commitment == initialCommitment');
		//calculateRoot(rootBefore_);
		// rootBefore.assertEquals(initialCommitment);
		// Circuit.log('rootBefore == initialCommitment');
		//let dao = new Account(Local.testAccounts[0].publicKey, UInt32.from(0));

		Tree.set(key_, hash_);

		const newRoot = Tree.getRoot();

		this.commitment.set(newRoot);
		this.commitment.assertEquals(newRoot);
	}

	@method updateDAO(
		witness: MerkleMapWitness,
		key: Field,
		newValue: Field,
		previousValue: Field
	) {
		const initialRoot = this.commitment.get();
		this.commitment.assertEquals(initialRoot);
		Circuit.log("Circuit.log currentRoot=", initialRoot);
		Circuit.log("Circuit.log key=", key);
		Circuit.log("Circuit.log previousValue=", previousValue);
		Circuit.log("Circuit.log newValue=", newValue);

		// check the initial state matches what we expect
		const [previousRoot, previousKey] = witness.computeRootAndKey(previousValue);
		previousRoot.assertEquals(initialRoot);
		// check the key is the correct key 
		previousKey.assertEquals(key);
		Circuit.log("Circuit.log previousRoot=", previousRoot);
		Circuit.log("Circuit.log previousKey=", previousKey);

		// compute the new root for the existent key and the newValue
		const [newRoot, _] = witness.computeRootAndKey(newValue);
		Circuit.log("Circuit.log newRoot=", newRoot);

		// set the new root
		this.commitment.set(newRoot);

		const changedRoot = this.commitment.get();
		this.commitment.assertEquals(changedRoot);
		Circuit.log("Circuit.log done !");
	}
}

/*********** Variables to make proofs ***************/

let communities = Array(Community);

// let key = Field(0);
// let height = 12;

// Tree root
let zeroCommitment: Field = Field(0);
// MerkleTree
let Tree = new MerkleMap();
// MerkleWitness
//const MyMerkleWitness = new MerkleMapWitness()    //@Dev: Search if that can grow 

/***************************************************/

await DAOFactory.compile();
console.log('SnarkyJS loaded');

const useProof = true;

const Local = Mina.LocalBlockchain({ proofsEnabled: useProof });
Mina.setActiveInstance(Local);
const { privateKey: deployerKey, publicKey: deployerAccount } = Local.testAccounts[0];
const { privateKey: senderKey, publicKey: senderAccount } = Local.testAccounts[1];

const zkAppPrivateKey = PrivateKey.random();
const zkAppAddress = zkAppPrivateKey.toPublicKey();

// Create a new instance and deploy
const zkAppInstance = new DAOFactory(zkAppAddress);
const deployTxn = await Mina.transaction(deployerAccount, () => {
	AccountUpdate.fundNewAccount(deployerAccount);
	zkAppInstance.deploy();
});
await deployTxn.sign([deployerKey, zkAppPrivateKey]).send();

// get the initial state of DAOFactory after deployment
const initialCommit = zkAppInstance.commitment.get();
console.log('state after init:', initialCommit.toString());

// Create a new community
let newCommunity = new Community({
	//index: key,
	publicKey: new PublicKey,
	admins: [deployerAccount],
	validators: [deployerAccount],
	validated: false,
})
console.log('community added');

const hash = Poseidon.hash(newCommunity.publicKey.toFields());
//let hash2 = newCommunity.toFields(newCommunity);
console.log('hashed');

const hashString = (str: string): Field => {
	/* We use the Poeidon hash to hash a given long string */
	// we need to convert the String to an array of bytes
	const bytes = (new TextEncoder()).encode(str);
	//console.log("bytes=", bytes);
	// now we need the bytes array as an array of Fields
	const fields: Field[] = [];
	bytes.map((b: any): any => { fields.push(Field(b)) });
	//console.log("fields array=", fields);
	// now we can hash it using Poseidon
	const hash = Poseidon.hash(fields);
	//console.log("hash=", hash);
	return hash;
  }

const txn1 = await Mina.transaction(senderAccount, () => {
	console.log('starting txn 1');

	// const key = String('B62qmxBwjeooVHK2YhpVXKEw74NS8nxE7GgA2KDrNuN2fxVemXHJvZS');
	// console.log('key is: ', key);
	// const keyToString = String(key);
	// console.log('keyToString is: ', keyToString);
	// const keyToString2 = JSON.stringify(key);
	// console.log('keyToString2 is: ', keyToString2);
	// console.log(keyToString2.valueOf());
	// const keyToField = Field(key);
	// console.log('keyToField is: ', keyToField);

	const key = JSON.stringify(newCommunity);
	console.log('key is: ', key);

	// if(this.hashString != undefined) {

	// }
	const keyToField = hashString(key);
	console.log('keyToField is: ', keyToField);

	Tree.set(Field(0), keyToField ?? Field(0));
	console.log('leaf seted');
	
	zkAppInstance.addDAO(Field(0), keyToField);
	console.log('Dao added');
});
await txn1.prove();
await txn1.sign([senderKey]).send();

const commit1 = zkAppInstance.commitment.get();
console.log('state after txn1:', commit1.toString());


const txn2 = await Mina.transaction(senderAccount, () => {
	const key = Field(String(newCommunity.publicKey));
	Tree.set(key, hash);
	zkAppInstance.addDAO(key, hash);
});
await txn2.prove();
await txn2.sign([senderKey]).send();

const commit2 = zkAppInstance.commitment.get();
console.log('state after txn2:', commit2.toString());


const txn3 = await Mina.transaction(senderAccount, () => {

	const treeWitness = deserializeWitness("new");
	const key = Field(String(newCommunity.publicKey));
	const newValue = Field(0);
	const oldValue = Field(0);
	Tree.set(key, hash);
	zkAppInstance.updateDAO(treeWitness, hash, newValue, oldValue);
});
await txn3.prove();
await txn3.sign([senderKey]).send();

const commit3 = zkAppInstance.commitment.get();
console.log('state after txn3:', commit3.toString());

console.log('Shutting down');
