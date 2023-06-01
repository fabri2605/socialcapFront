# Personas

### Entity Model

~~~typescript
Personas {
  uid: UUID; // a unique UID auto assigned on creation
  account_id: PublicKey; // the linked MINA account
  email: string;
  full_name: string;
  avatar: DataURI;
  preferences: Map<string,string>;
  state: string; // P-Pending A-Active V-Verified S-Suspended X-Deleted
  //
  // Future
  // include Telegram, Phone, and other contact info...
}
~~~

### sign_up()

Starts the onboarding process for a new user.

Will send a `otp` passcode to the contact email, and return a `session_key`. This key is linked to the sent `otp` and is needed to continue the onboarding.

**Params:**

```typescript
{
	fullName: string, // required 
  email: string, // required
  phone: string, // optional
  avatar: DataURI, // optional
  preferences: Map<string,string> // optional
}
```

**Result:**

~~~typescript
data: {
	session_key: string
} 
~~~

**Actions:**

1. If no email or full_name => Error BAD_REQUEST (incomplete params)
2. If received email exists in `personas` table => Error CONFLICT (already exists)
3. Generate `otp` and `key`
4. If email exists in table `sessions` => update  `otp,key where email`
5. If email does no exist in table `sessions` => insert into `sessions(key,email,otp)`
6. Insert into `personas(email, state:PENDING, ...params)` 
7. Send email with `otp`  to user

**Errors**:

- `BAD_REQUEST`: Incomplete or malformed body. Must fullfill required params.
- `CONFLICT`: User is already registered. Must go to `login`.