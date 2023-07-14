# API  resources & methods

## General conventions

We follow the [JSON-RPC 2.0](https://www.jsonrpc.org/specification) convention (as used in [tRPC/HTTP RPC Specification](https://trpc.io/docs/rpc)) for all its endpoints. Besides that all API requests follow usual HTTP API conventions. 

We can divide this into two categories:

- **Queries**: A procedure call that gets some data ( `GET`).

- **Mutations**: A procedure call that creates, updates, or deletes some data (`POST`).

#### Headers

- `Accept` : is always `application/json`.

- `Content-type` : is always `application/json`.
- `Authorization`: when required it MUST contain a JSON Web Token (JWT)) associated to the user session, in the format "Bearer ${AUTHORIZATION_TOKEN}"

#### Requests, Responses and Errors

- All endpoints are of the form `/api/query/${method}?params=...` or `/api/mutation/${method}`.

- All GET requests query params are JSON stringified.

- All POST requests body payloads are in JSON format, with the structure defined by each relevant request.

- All responses are in JSON format, with the structure defined by each relevant request.

- All error responses follow a common format and error codes described below.

### Query requests

**Request**: 

- HTTP Method: `GET`
- Endpoint:  `/api/query/${method}`
- All the function call params are JSON-stringified in a query parameter `?params` as `${encodeURIComponent(JSON.stringify(callParams))`. 

The resulting request will be formed using:

- Url: `/api/query/${method}?params=${encodeURIComponent(JSON.stringify(callParams))}`

Example:

- GET  `/api/query/get_all_communities?params={"states":["A"],"order: "popular"}`

**Response**:

All Query responses are in JSON format, with the structure defined by each relevant request.

~~~typescript
class QueryResponse {
  result: {
   	start: number, 
    count: number,
  	limit: number,
		total: number,
		data: Array<Any> // 0 or more items
	},
	error: {
		code: number, // HTTP error codes
		message: string,
    text: string, // descr
    data: Map<string,string> // // Extra, customizable, meta data
	}
}
~~~

On success a HTTP status code `200` is returned, `result !== null ` and `error === null `.

### Mutation requests

**Request**: 

- HTTP Method: `POST`
- Endpoint:  `/api/mutation/${method}`
- All the function call params are included in the body payload 

The resulting request will be formed using:

- Url: `/api/mutation/${method}`
- Body: `{...callParams}`

Example:

- POST  `/api/mutation/register_new_community`

- Body (payload): 

  ~~~ typescript
  {
    name: "Jaranita DAO",// a Unique name for this community
    description: "A DAO full of lazy devs",
    logo: "data:image/png;base64,iVBAA...kJggg==",
    creator_id: "B62qpH...iqYAm", // AccountId of persona creating this community
  }
  ~~~

**Response**:

All Mutation responses are in JSON format, , with the structure for `data` defined by each relevant request.

~~~typescript
class QueryResponse {
  result: {
    data: Any // a data object return by the server
  } 
	error: {
		code: number, // HTTP error codes
		message: string,
    data: Map<string,string> // // Extra, customizable, meta data
	}
}
~~~

On success a HTTP status code `200` is returned, `result !== null ` and `error === null `.

### Errors

When on error  a HTTP error status code is returned, `result === null ` and `error !== null `. 

Where `error` contains:

-  `code` is always an HTTP Status code, as described in [List of HTTP status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes).
- `message` is a descriptive text message relevant to the request.
-  `data` is a Map of additional information setup by the server.

An the  error `code`will be in one of this categories:

**What are you talking about?**

- PARSE_ERROR: 400,
- BAD_REQUEST: 400
- NOT_FOUND: 404
- METHOD_NOT_SUPPORTED: 405
- CONFLICT: 409,
- PRECONDITION_FAILED: 412
- PAYLOAD_TOO_LARGE: 413

**Who are you? Not for you ...**

- UNAUTHORIZED: 401
- FORBIDDEN: 403

**Uppps ! I have shamely failed ...** 

- TIMEOUT: 408,
- INTERNAL_SERVER_ERROR: 500,


## Resources

### Sessions

Methods:
- request_otp(email): {{session_key},error}
- login(otp,session_key): {{authorization,profile},error}

Details in [api-sessions.md](./api-sessions.md): 

### Persons

Methods:
- sign_up({email, ...}): {authorization,profile},error}
- register_as_validator(my, communityId)
- request_membership(my, communityId)
- update_profile(my, {...})

Details in [api-personas.md](./api-personas.md)

### Communities

Methods:
- get-all_communities(filters,order)
- get_my_communities(my)
- get_community(my,id)
- get_community_members(my,filters)
- register_new_community(my,payload)
- update_community(my, payload)

Details in [api-communities.md](./api-communities.md)

### Claims

Methods:
- get_my_claims
- get_claim_evidence
- get_claim_evidence_files
- start_claim
- update_claim_evidence
- upload_claim_evidence_files
- submit_claim

Details in [api-claims.md](./api-claims.md)

### Tasks

Methods:
- get_my_tasks
- get_task
- save_task_draft
- submit_task

Details in [api-tasks.md](./api-tasks.md)

### Credentials

Methods:
- get_my_credentials
- issue_credential
- mint_credential

Details in [api-credentials.md](./api-credentials.md)

### Plans

Details in [api-plans.md](./api-plans.md)

