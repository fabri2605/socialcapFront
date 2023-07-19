import { fastify, prisma } from "~/global";
import { UID } from "~/models/uid"
import { i18n as _ } from "~/i18n/messages";
import { hasError, hasResult } from "~/core/responses";
import { PERSONS_MERKLE_MAP } from "~/dbs/merkle/index";
import { updateMerkleMapOrRaise } from "~/dbs/merkle/merkle-map-helpers";
import { updatePersonOrRaise, PersonState } from "~/dbs/indexer/person-helpers";
import { ProvablePerson } from "~/models/provable-person";
import { MinaService } from "~/services/mina-service";

/**
 * signUp
 * Starts the onboarding process for a new user.
 * @param params Object: { email, ... }
 * @returns MutationResult
 */
export async function signUp(params: {
  full_name: string;
  email: string;
  phone?: string;
  telegram?: string;
}) {
  // 1. If no email/full_name/account_id => Error BAD_REQUEST (incomplete params)
  if (!params.email)
    return hasError.MissingParams(_.missing_param("email", "sign_up"));
  if (!params.full_name)
    return hasError.MissingParams(_.missing_param("full_name", "sign_up"));

  // 2. If received email exists in `persons` table => Error CONFLICT (already exists)
  const noPerson = await prisma.person.findUnique({
    where: { email: params.email },
  });
  if (noPerson !== null)
    return hasError.Conflict(_.persons_already_registered(params.email));

  // 3. Create default values for fields 'avatar' and 'preferences'
  const defaultPrefs = "{}";

  // 4. Insert into `personas(email, state:PENDING, ...params)`
  const person = await prisma.person.create({
    data: {
      uid: UID.uuid4(),
      accountId: "",
      state: PersonState.initial(),
      fullName: params.full_name,
      email: params.email,
      phone: params.phone || "",
      telegram: params.telegram || "",
      preferences: defaultPrefs,
    },
  });
  if (!person)
    return hasError.DatabaseEngine(_.database_error("insert into table Persons"));

  console.log(`sign_up params=`, params);
  console.log(`sign_up result=`, person);

  // 5. Add to ProvablePerson MerkleMap and updatePerson() on RootContract ...
  // this is just a Promise call and we do not wait for response !!!
  // updateProvablePerson(person);

  // 7. Return the fully created Person data
  return hasResult(person);
}


export async function updateProfile(params: any) {
  try {
    const uid = params.uid;
    const key = UID.toField(uid);
    
    // update Indexer
    const person = await updatePersonOrRaise(uid, params);
    
    // update Merkle 
    const provable = new ProvablePerson(person);
    const {map, updated, witness} = await updateMerkleMapOrRaise(
      PERSONS_MERKLE_MAP, uid, provable.hash()
    );

    // call Mina service here ...
    await MinaService.updatePersonsRootOrRaise(
      provable, map, witness, updated
    );

    return hasResult(person); 
  }
  catch (err: any) {
    return hasError.This(err);
  }
}
