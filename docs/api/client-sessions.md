# Sessions (client)

This is the SDK class used to access the server endpoints. Includes some local methods too.

**Class**

~~~typescript
/**
	Session data will be stored in the browser localStorage 
	under 'active-session' key and containing "{jwt,expires,accountId}".
*/
export class Session {
	jwt: string; // JSON Web Token returned by server on success login
  expires: UTCDatetime;
  sessionKey: string;
  accountId: AccountId;

  constructor() {
  	this.jwt = null;
    this.expires = null;
    this.accountId = null;
    this.session_key = null;
  };
  
  isActive(): boolean; // True if active session
  
  restore(): this;
  
  getAuthorization(): string; // or Null if no active session
  
  bindAccount(accountId: string): void;
  
  async requestOTP(email: string): {result,error};
  
  async login(otp: string): this;
  
  logout(): void;
}

export const activeSession = (new Session()).restore();
~~~



**Methods**

### isActive(): boolean

Check if we have an active session available. The active session must be stored in `localStorage` in the `active-session` object. 

**Params:** None

**Returns: boolean**

If it exists and `jwt` is not null and it is not expired => return `true`.

Otherwise return `false`.

-.-

### restore(): this

Restores the current active session stored in LocalStorage if it exists.

**Params:** None

**Returns:**  `this`

**Actions**:

1. Load from LocalStorage using `active-session`  object.
2. If not null, update `this properties` ( jwt,session_key,expires,accountId ).

-.-

### getAuthorization(): string

Return the Authorization string to be used in GET/POST Headers.

**Params:** None

**Returns:**  `Bearer ${this.jwt}` or `null`

**Actions**:

1. Restore from LocalStorage
2. If not null `Authorization = Bearer ${this.jwt} ` 

-.-

### bindAccount(accountId): this

Associate the given `accountId` to this session. 

This may be necessary when we have a logged user that has never used his/her MINA wallet (in this case we will have no MINA account yet). The first time he uses it we register its AccountId into the session.

**Params:** None

**Returns:**  `this`

**Actions**:

1. Update `this.accountId` using the received `accountId` 
2. Save it into `active-session`  object in LocalStorage.

-.-

### logout(): this

Logout from server and cleanup active session from LocalStorage.

**Params:** None

**Returns:**  `this`

**Actions**:

1. Cleanup `this` session object assigning null to all properties.
2. Remove the `active-session`  object from LocalStorage.

-.-

### async requestOTP({email}): {result, error}

When the user has logged out and it's AUTHORIZATION token has been erased from the LocalStorage. 

The user MUST remember the email or phone used for signup, otherwise we can't do any recovery.

Will send a new `otp` passcode to the contact email, and receive a `sessionKey`. This key is linked to the sent `otp` and is needed to continue the onboarding.

**Params:**

```typescript
{
  email: string // required
}
```

**Result:** 

~~~typescript
{
	sessionKey: string
} 
~~~

**Actions:**

1. Will do an RPC to endpoint `/api/mutate/requestOTP` . 
2. Will receive an `session_key` token which can be used to continue to login. 

**Errors**:

- `BAD_REQUEST`: Incomplete or malformed body. Must fullfill required params.
- `NOT_FOUND`:  User not registered. Must go to `sign_up`.

-.-

### async login({otp,sessionKey}): {result, error}

When the user has completed the signup or recovery phases and has entered the received OTP passcode we can establish an authenticated and authorized connection with the server.

**Params:**

```typescript
{
  otp: string, // required
  sessionKey: string // required
}
```

**Result:** 

~~~typescript
{
  authorized: string,
  persona: Persona
}
~~~

**Actions:**

1. Will do an RPC to endpoint `/api/mutate/login` . 
2. Will receive an `authorized` token which can be used for all subsequent calls to the API. 
3. Will receive a `persona`with additional information about the logged user.
4. If success will update the `active-session` obj in LocalStorage with the received data.
5. If success will update the `active-user` obj  in LocalStorage with the received data.

**Errors**:

- `BAD_REQUEST`: Incomplete or malformed body. Must fullfill required params.
- `UNAUTHORIZED`:  Invalid passcode. Must try again.

-.-
