import {
    AccountUpdate,
    Circuit,
    CircuitValue,
    Field,
    isReady,
    Mina,
    method,
    MerkleTree,
    MerkleWitness,
    Poseidon,
    PublicKey,
    Permissions,
    PrivateKey,
    prop,
    SmartContract,
    State,
    state,
    Struct,
    UInt32,
} from 'snarkyjs';
  
  await isReady;
  
  const doProofs = true;
  
  class MyMerkleWitness extends MerkleWitness(8) {}     //@Dev: Search if that can grow 
  
  class Account extends CircuitValue {
    @prop publicKey: PublicKey;
    @prop voted: boolean;
  
    constructor(publicKey: PublicKey, voted: boolean) {
      super(publicKey);
      this.publicKey = publicKey;
      this.voted = false;
    }
  
    hash(): Field {
      return Poseidon.hash(this.toFields());
    }
  
    setVote(): Account {
      return new Account(this.publicKey, true);
    }
  }
  // Tree root
  let initialCommitment: Field = Field(0);
  
  class Nullifier extends SmartContract {
    // To commit to data, with the ability to "reveal" it later
    @state(Field) commitment = State<Field>();
  
    init() {
      super.init();
      this.account.permissions.set({
        ...Permissions.default(),
        editState: Permissions.proofOrSignature(),
      });
      this.commitment.set(initialCommitment);
    }
  
    @method
    setVoted(account: Account, path: MyMerkleWitness) {
      // Fetch the on-chain commitment
      let commitment = this.commitment.get();
      this.commitment.assertEquals(commitment);
  
      // we check that the account is within the committed Merkle Tree
      path.calculateRoot(account.hash()).assertEquals(commitment);
  
      // we update the account and grant one point!
      let newAccount = account.setVote();
  
      // we calculate the new Merkle Root, based on the account changes
      let newCommitment = path.calculateRoot(newAccount.hash());
  
      this.commitment.set(newCommitment);
      this.commitment.assertEquals(newCommitment);
    }
  }
  
  type Names = 'Bob' | 'Alice' | 'Charlie' | 'Olivia';
  
  let Local = Mina.LocalBlockchain({ proofsEnabled: doProofs });
  Mina.setActiveInstance(Local);
  let initialBalance = 10_000_000_000;
  
  let feePayerKey = Local.testAccounts[0].privateKey;
  let feePayer = Local.testAccounts[0].publicKey;
  
  // the zkapp account
  let zkappKey = PrivateKey.random();
  let zkappAddress = zkappKey.toPublicKey();
  
  // this map serves as our off-chain in-memory storage
  let Accounts: Map<string, Account> = new Map<Names, Account>();
  
  let bob = new Account(Local.testAccounts[0].publicKey, false);
  let alice = new Account(Local.testAccounts[1].publicKey, false);
  let charlie = new Account(Local.testAccounts[2].publicKey, false);
  let olivia = new Account(Local.testAccounts[3].publicKey, false);
  
  Accounts.set('Bob', bob);
  Accounts.set('Alice', alice);
  Accounts.set('Charlie', charlie);
  Accounts.set('Olivia', olivia);
  
  // we now need "wrap" the Merkle tree around our off-chain storage
  // we initialize a new Merkle Tree with height 8
  const Tree = new MerkleTree(8);
  
  Tree.setLeaf(0n, bob.hash());
  Tree.setLeaf(1n, alice.hash());
  Tree.setLeaf(2n, charlie.hash());
  Tree.setLeaf(3n, olivia.hash());
  
  // now that we got our accounts set up, we need the commitment to deploy our contract!
  initialCommitment = Tree.getRoot();
  
  let nullifierZkApp = new Nullifier(zkappAddress);
  console.log('Deploying...');
  if (doProofs) {
    await Nullifier.compile();
  }
  let tx = await Mina.transaction(feePayer, () => {
    AccountUpdate.fundNewAccount(feePayer).send({
      to: zkappAddress,
      amount: initialBalance,
    });
    nullifierZkApp.deploy();
  });
  await tx.sign([feePayerKey, zkappKey]).send();
  
  console.log('Initial : ' + Accounts.get('Bob')?.voted);
  
  console.log('Making vote..');
  await vote('Bob', 0n);
  
  console.log('Final : ' + Accounts.get('Bob')?.voted);
  
  async function vote(name: Names, index: bigint) {
    let account = Accounts.get(name)!;
    let w = Tree.getWitness(index);
    let witness = new MyMerkleWitness(w);
  
    let tx = await Mina.transaction(feePayer, () => {
      nullifierZkApp.setVoted(account, witness);
    });
    await tx.prove();
    await tx.sign([feePayerKey, zkappKey]).send();
  
    // if the transaction was successful, we can update our off-chain storage as well
    account.voted = true;
    Tree.setLeaf(index, account.hash());
    nullifierZkApp.commitment.get().assertEquals(Tree.getRoot());
  }