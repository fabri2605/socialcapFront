# Personas

### Entity Model

~~~typescript
Personas {
  uid           String   @id @unique @default(uuid())
  account_id    String   @unique @map("account_id") @db.VarChar(36)
  full_name     String   @map("full_name") @db.VarChar(128)
  state         String   @db.VarChar(12) // P-Pending A-Active V-Verified S-Suspended X-Deleted  
  email         String   @unique @db.VarChar(64)
  phone         String?  @db.VarChar(24)
  telegram      String?  @db.VarChar(24)
  avatar        String?  @db.Text // a DataURI
  preferences   Json?    @db.Json
  created_utc   DateTime @default(now()) @map("created_utc")
  updated_utc   DateTime @updatedAt @map("updated_utc")
}
~~~

### mutation/sign_up

Starts the onboarding process for a new user, adding it to the Persons table,and filling default values (avatar, preferences, etc.)

**IMPORTANT**: We will not require a MINA account for signup. Just Name and an email is enough for initial signup.

Initially this new user will not have an associated accountId, and will be added with state='PENDING', until it associates a MINA account to his profile and we can validate it. After that we cha change it to state='ACTIVE'.

**Params:**

```typescript
{
	full_name: string, // required 
  email: string, // required
  phone?: string, // optional
  telegram?: string, // optional
}
```

**Result:**

~~~typescript
data: {
	profile: {
    uid: string,
    account_id: string,
    full_name: string,
    state: string,
    email: string,
    phone: string,
    telegram: string,
    avatar: DataURI,
    preferences: Json,
    created_utc: UTCDatetime,
    updated_utc: UTCDatetime
  }
} 
~~~

**Actions:**

1. If no email/full_name => Error BAD_REQUEST (incomplete params)
2. If received email exists in `persons` table => Error CONFLICT (already exists)
3. Create default values for fields 'avatar' and 'preferences'
4. Insert into `personas(email, state:PENDING, ...params)` 
5. Return the fully created Person data

**Errors**:

- `BAD_REQUEST`: Incomplete or malformed body. Must fullfill required params.
- `CONFLICT`: User is already registered. Must go to `login`.