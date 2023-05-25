# Sessions API

**Entity Model**

~~~sql
create table Sessions(
  skey varchar(128) PRIMARY KEY,
 	otp varchar(128),
  email varchar(128) UNIQUE NOT NULL,
	created_utc TIMESTAMP,
  expires_utc TIMESTAMP 
)
~~~



**Server Methods**

### /mutation/request_otp

When the user has logged out and it's AUTHORIZATION token has been erased from the LocalStorage, the user must request a new OTP (One Time Password) to login again.

The user MUST remember the email or phone used for signup, otherwise we can't do any recovery.

Will send a new `otp` passcode to the contact email, and return a `session_key` linked to the sent `otp` and needed to continue the onboarding.

**Params:**

```typescript
{
  email: string // required
}
```

**Result:**

~~~typescript
data: {
	session_key: string // table Sessions.skey where email
} 
~~~

**Actions:**

1. If no email or full_name => Error BAD_REQUEST (incomplete params)
2. If received email NOT exists in table `personas` => Error NOT_FOUND (does not exists)
3. Generate `otp` and `key`
4. If email exists in table `sessions` => delete all  `where email`
5. If email does no exist in table `sessions` => insert into `sessions(email,key,otp)`
6. Send email with `otp`  to user

**Error**:

- `BAD_REQUEST`: Incomplete or malformed body. Must fullfill required params.
- `NOT_FOUND`:  User not registered. Must go to `sign_up`.

### /mutation/login

When the user has completed the signup or recovery phases he needs to enter the received OTP passcode, and so we can establish an authenticated and authorized connection with the server.

Will return an `authorization` token which can be used for all subsequent calls to the API. This is JSON Web Token is composed using `{uid, access_utc, expires_utc, session_key}`.

Will also return a `profile` with some retricted info about the Person who did the login.

**Params:**

```typescript
{
  otp: string, // required
  session_key: string // required
}
```

**Result:**

~~~typescript
{
	authorization: string,
  profile: {
    account_id: string,
    full_name: string,
    state: string,
    avatar: DataURI,
    preferences: Json,
    created_utc: UTCDatetime,
    updated_utc: UTCDatetime
  }
} 
~~~

**Actions:**

1. If no `session_key` or `otp` => Error BAD_REQUEST (incomplete params)
2. If received `session_key` NOT matchs existent in `session` table => Error BAD_REQUEST 
3. If received `otp` NOT matchs existent in `session` table => Error UNAUTHORIZED (bad OTP)
4. Get `email` from `sessions where session_key` 
5. Find one from `personas where email` => `persona`
6. Check person status just in case has been suspended, etc
7. Generate the `authorization` JWT using the `persona uid`  and extras

**Errors**:

- `BAD_REQUEST`: Incomplete or malformed body. Must fullfill required params.
- `UNAUTHORIZED`:  Invalid passcode, email or suspended user. May try again.
- `NOT_FOUND`: Invalid session key.

