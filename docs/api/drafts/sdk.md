### Account

~~~typescript
interface Account {
  publicKey: PublicKey;
  email: String128;
  avatar: Image;
  fullName: String128;
  preferences: KeyValueMap;
  
  constructor(
  	publicKey: PublicKey,
    email?: String128 = ""
  ) {
    super(publicKey, email);
    this.publicKey = publicKey;
  } 
  
  async updateProfile(
  	email: String128,
    avatar: Image,
    fullName: String128,
    prefs: KeyValueMap
  ): Account;
}

~~~

### Community factory

~~~typescript
class CommunityFactory {
	zkappId: PublicKey;

  // the contract (prover) with its own methods
  contract: SmartContract;

  // Proxies to arrays
	communities: Array<PublicKey>;
  members:  Array<PublicKey>;
  
	async createCommunity(
		accountId: PublicKey,	
		name: String128,
    description: Text,
    logo: Image, 
		admins: Array<PublicKey>
	): Community;
	
  async getCommunityById(
  	accountId: Publickey
  );
  
  async getCommunitiesList(
  	searchBy: String128
  ) -> Array<Community>;
}
~~~

### Community

~~~typescript
interface Community {

	accountId: PublicKey;
  status: Uint8; // (C)reated, (A)pproved, (S)uspended, (I)nactive, (X)Deleted
	name: String128;
  description: Text;
  logo: DataURI, // as a Data URI stored in DB, PNG or SVG format
  createdUtc: UTCDateTime;
  approvedUtc: UTCDateTime;
  updatedUtc: UTCDateTime;
  
  // the contract (prover) with its own methods
  contract: SmartContract;
  
  // Proxies to arrays
  members: Array<PublicKey>;
	admins: Array<PublicKey>;
  validators: Array<PublicKey>;
  auditors:  Array<PublicKey>;
  claims: Array<ClaimId>;
  plans: Array<ClaimPlanId>;
  credentials: Array<CredentialId>;
  pendingPayments: Array<ClaimId>;
  
	async addAdmin(
		accountId: PublicKey
	);

	async addValidator(
		accountId: PublicKey
	);

	async addAuditor(
		accountId: PublicKey
	);
	
  async upgradeValidator(
		accountId: PublicKey
  );
  
  async changeStatus(
    status: Uint8
  );

  async issueCredential(
  	claimId: UID,
    options: Any
  ): Credential ;
  
  async payValidators();
}
~~~



### Claims Collection

~~~typescript
interface ClaimsCollection {

  async addClaim(
  	claim: Claim
  ): ClaimsCollection;

  async removeClaim(
  	claimId: PublicKey
  ): ClaimsCollection;
  
	async updateClaim(
  	claim: Claim
  ): ClaimsCollection;

  async getClaimById(
  	claimId: PublicKey
  ): Claim;
  
  async getClaims(
  	filterBy: KeyValueMap, // applicant, community, plan, title, ...
  ): Array<Claim>;
}
~~~

### Claim

~~~typescript
interface IClaim {
  
	accountId: PublicKey;
	communityID: PublickKey;
	applicantID: PublickKey;
	planID: Uid;
  status: Uint8; // C-reated, P-Payed, V-Voting, A-pproved, R-Rejected, I-Ignored, E-mited, X-Deleted
  title: String128;
  description: Text;

  // dates
  started_utc: UTCDateTime;
  submited_utc: UTCDateTime;
  voted_utc: UTCDateTime;
  issued_utc: UTCDateTime;
  due_utc: UTCDateTime;
  updated_utc: UTCDateTime;

	// voting status
 	total_votes: Uint;
 	positive_votes: Unit;
 	negative_votes: Uint;
 	ignore_votes: Uint;
 	
 	// evidence encryption key
 	encryption: SymmetricKey;

  // the contract (prover) with its own methods
  contract: SmartContract;
  
  async getPlan(): ClaimPlan;

  async changeStatus(
    status: Uint8
  );
  
	async updateEvidence(
		data: KeyValueMap,
		files: Array<FileDescriptor>
	);
  
	async submitClaim(): Claim;
}
~~~






~~~typescript
class Claim implements IClaim, IMerkleTreeLeaf {
  
  constructor(
  	communityId: PublicKey,
		applicantID: PublickKey,
		planID: Uid
  ): Claim;
}
~~~







### ClaimPlan

### Merkle Trees 

A **Merkle Tree leaf interface**, so any entity which implements it cann add its objects to a Merkle Tree.

~~~typescript
interface IMerkelTreeLeaf {
	// This interface needs to be implemented by all 
	// entities which need to use a Merkle Tree
	
	hash(
		// Builds the hash from this leaf data 
	): HashKey;
  
  serialize(
  	// Serialize to a text string (JSON stringify) 
  	// from this Leaf data payload
  ): Text;
  
  deserialize(
  	// Deserialize from a text string (JSON parse) 
  	// and return the data payload
  ): Any;
  
  keys(
  	// Return a set of KeyValues which will be used to
  	// index this Leaf and latter search for it in the Tree
  ): Array<KeyValue>;
}
~~~

A **storable Merkle Tree** is a tree which can be stored into some storage provider (such a RDBMS or a KV store), and be latter retrieved from it. It also adds an indexer so we can search for leafs in the tree using a set of keys and its values.


~~~typescript
import { Field, MerkleTree } from 'snarkyjs';

interface LeafWitness { isLeft: boolean; sibling: Field }[];

class StorableMerkleTree {
  
  key: String128;
	private merkleTree: MerkleTree;
	private indexed: Map<KeyValue,bigint>;
  
  constructor(
  	key: String128,
    height?: Uint = 16, // up to 2^16 = 65536 leaves
    encripted?: EncryptionKey = null
  );
  
  async retrieve(
  	provider: StorageProvider
  ) this;
  
  async save(
  	provider: StorageProvider
  );

	async buildTree(
		leaves: Array<IMerkleTreeLeaf>
	): this;

  async addLeaf(
		leaf: IMerkleTreeLeaf
	): this;

  async updateLeaf(
		leaf: IMerkleTreeLeaf
	): this;
  
  async searchTree(
  	byKeys: Array<KeyValue>
  ): Array<bigint>;

  async getRootHash(
  ):  Field;
  
  async getWitness(
  	index: bigint
  ): LeafWitness;
}
~~~

# Sessions

~~~typescript
class Session {
	jwt: string,
  expires: UTCDatetime;
}

class OnError {
  code: integer, // one of HTTP error codes
  message: string
}
~~~



@local get_active_session(): Session;

@remote async emmit_OTP_code(email: string): void;

Endpoint: `/mutations/emmit_otp_code`

@remote async start_session(otp: string): Promise<[Session, OnError]>, 

Endpoint: `/mutations/start_session`

async close_session(): void;

### Persons

register_as_validator

request_membership

update_profile

### Claims

get_my_claims

get_claim_evidence

get_claim_evidence_files

start_claim

update_claim_evidence

upload_claim_evidence_files

submit_claim

### Tasks

get_my_tasks

get_task

submit_task

### Credentials

get_my_credentials

issue_credential

