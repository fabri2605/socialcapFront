# Communities

Manages the communities collection. 

Notes: This is managed as a standard Web2 collection in a std Database and backend server. 

BUT this collection also has an associated Sparse Merkle Trees (SMT), so any time the collection is changed, the corresponding Merkle Tree is updated. 

See: [Sparse Merkle Trees and the New State Model](https://lisk.com/blog/posts/sparse-merkle-trees-and-new-state-model) for a detailed description of Sparse Merkle Trees.



### get_all_communities

Endpoint: `/query/all_communities`

Client: 

~~~
class QueryResponse {
  result: {
   	start: number,
  	limit: number,
		total: number
		data: Array<Any>
	},
	error: 
		code: number, 
		message: string
	}
}

async function get_all_communities(
	filterBy: string,
	orderBy: string,
	start: number,
	limit: number
): Promise<QueryResponse>
~~~



Gets the list of communities, optionally filtered and ordered.

**Params**:

- `state`: filter by states []

- `search`: filter using a search string, with one or more words, eg: "creatives digital". Optional, default="" (all items)

- `order`: order by `name` or `popularity` (number of members). Optional, default="name"
- `start`: start offset in collection. Optional, default: "0".
- `limit`: max number of items to fetch. Optional, default: "1000".

**Result**:

~~~typescript
{
  start: number,
  limit: number,
	total: number,
	mt_root: string,// the associated Merkle Tree root hash
	items: Array<{
	  account_id: string,
    status: string, // C-reated, A-pproved, I-nactive, X-Deleted
		name: string,
	  description: string,
  	created_utc: string, // UTC ISO 8601, eg: "2023-05-12T14:55:00Z"
  	approved_utc: string,
  	updated_utc: string,
		total_members: number,
		total_validators: number,
		total_auditors: number,
		total_admins: number,
		total_claims: number
		total_credentials: number		
	}>
}
~~~

**Error response**:

~~~typescript
{
	error: {
		code: number, 
		message: string
	}
}
~~~

Error codes

- `400` Bad request: some params are invalid.
- `416` Range Not Satisfiable: start+limit exceed the total length of collection.
- `413` Payload Too Large: limit exceeds payload limits.

### get_my_communities

### register_new_community

### 















### root.getCommunities 

- 

### POST /communities

Adds a community to the collection. Anyone can do this, as long as it is logged in, and this user automatically becomes the Admin of the added community.

Initially, the community will be initialized with `status=C` (created) and will not allow many operations on it until it is not approved.

**Payload**

~~~typescript
{
  name: string,// a Unique name for this community
  description: string,
  logo: DataURI,
  creator_id: PublicKey, // AccountId of the persona creating this community
}
~~~

**Actions**

- 

**Response:**

~~~
{
	account_id: string,
	mt_root: string,// the associated Merkle Tree root hash
  status: string, // C-reated, A-pproved, I-nactive, X-Deleted
	name: string,
	description: string,
  created_utc: string, // UTC ISO 8601, eg: "2023-05-12T14:55:00Z"
  approved_utc: string,
  updated_utc: string,
	total_members: number,
	total_validators: number,
	total_auditors: number,
	total_admins: number,
	total_claims: number
	total_credentials: number		
}
~~~

**On Error**:

- `400` Bad request: some params are invalid.
- `416` Range Not Satisfiable: start+limit exceed the total length of collection.
- `413` Payload Too Large: limit exceeds payload limits.

### GET /communities/{id}

### GET /communities/{id}

### GET /communities/{id}/participants ?is= &filter=

### POST /communities/{id}/participants 

