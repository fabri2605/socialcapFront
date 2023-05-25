import { randomInt, randomUUID } from "crypto";
import { fastify, prisma } from "~/global";
import { i18n as _ } from "~/i18n/messages";
import { Errors } from "~/routes/errors";
import { formatMutationResult } from "~/routes/results";
import { PersonState } from "~/models/person-helpers";

/**
 * signUp
 * Starts the onboarding process for a new user.
 * @param params Object: { email, ... }
 * @returns MutationResult
 */
export async function signUp(params: {
  full_name: string,
  email: string,
  phone?: string,
  telegram?: string
}) { 
  // 1. If no email/full_name/account_id => Error BAD_REQUEST (incomplete params)
  const missing = !(params.email && params.full_name);
  if (missing) return Errors.MissingParams(
    _.missing_param('email/full_name', 'sign_up')
  );

  // 2. If received email exists in `persons` table => Error CONFLICT (already exists)
  const noPerson = await prisma.person.findUnique({
    where: { email: params.email }
  }); 
  if (noPerson !== null) return Errors.Conflict(
    _.persons_already_registered(params.email)
  );

  // 3. Create default values for fields 'avatar' and 'preferences'
  const defaultAvatar = "DataURI";
  const defaultPrefs = {};

  // 4. Insert into `personas(email, state:PENDING, ...params)` 
  const hasPerson = await prisma.person.create({ 
    data: { 
      uid: randomUUID(),
      accountId: "",
      state: PersonState.PENDING,
      fullName: params.full_name, 
      email: params.email, 
      phone: params.phone || "",
      telegram: params.telegram || "",
      avatar: defaultAvatar,
      preferences: defaultPrefs,
    }
  })
  if (! hasPerson) return Errors.DatabaseEngine(
    _.database_error("insert into table Persons")
  );  
  
  console.log(`sign_up params=`, params);
  console.log(`sign_up result=`, hasPerson);
  
  // 5. Return the fully created Person data
  return formatMutationResult({
    profile: hasPerson
  });
}
