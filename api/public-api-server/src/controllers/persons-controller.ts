import { randomInt, randomUUID } from "crypto";
import { fastify, prisma } from "~/global";
import { UID } from "~/models/uid"
import { i18n as _ } from "~/i18n/messages";
import { Errors } from "~/routes/errors";
import { formatMutationResult } from "~/routes/results";
import { PersonState } from "~/models/person-helpers";
import { getPersonOrRaise, updatePersonOrRaise } from "~/dbs/indexer/person";
import { OffchainMerkleMap, PERSONS_MERKLE_MAP } from "~/dbs/merkle";
import { ProvablePerson } from "~/models/provable-person";

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
    return Errors.MissingParams(_.missing_param("email", "sign_up"));
  if (!params.full_name)
    return Errors.MissingParams(_.missing_param("full_name", "sign_up"));

  // 2. If received email exists in `persons` table => Error CONFLICT (already exists)
  const noPerson = await prisma.person.findUnique({
    where: { email: params.email },
  });
  if (noPerson !== null)
    return Errors.Conflict(_.persons_already_registered(params.email));

  // 3. Create default values for fields 'avatar' and 'preferences'
  const defaultPrefs = "{}";

  // 4. Insert into `personas(email, state:PENDING, ...params)`
  const person = await prisma.person.create({
    data: {
      uid: UID.uuid4(),
      accountId: "",
      state: PersonState.PENDING,
      fullName: params.full_name,
      email: params.email,
      phone: params.phone || "",
      telegram: params.telegram || "",
      preferences: defaultPrefs,
    },
  });
  if (!person)
    return Errors.DatabaseEngine(_.database_error("insert into table Persons"));

  console.log(`sign_up params=`, params);
  console.log(`sign_up result=`, person);

  // 5. Add to ProvablePerson MerkleMap and updatePerson() on RootContract ...
  // this is just a Promise call and we do not wait for response !!!
  // updateProvablePerson(person);

  // 7. Return the fully created Person data
  return formatMutationResult(person);
}


/**
 * 
 * @param params 
 */
export async function updateProfile(params: any) {
  try {
    const uid = params.uid;
    const key = UID.toField(uid);
    const mapid = PERSONS_MERKLE_MAP;
    // get current state
    const person0 = await getPersonOrRaise(uid);
    const hash0 = await getMerkleLeafOrRaise(mapid, key);

    // now update ...
    const person1 = await updatePersonOrRaise(uid, params);
    const provable = new ProvablePerson(person1);
    const hash1 = provable.hash();
    const updatedMerkle = await setMerkleLeafOrRaise(mapid, key, hash1);
    const map = {};
    const witness = map.getWitness(key);
    MinaService.sendUpdateTransactionOrRevert(
      provable, map, witness, updatedMerkle, 
      () => {
        // revert db and Merkle changes 
        await updatePersonOrRaise(uid,  person0);
        await setMerkleLeafOrRaise(mapid, key, hash0);
      }
    );
  }
  catch (err) {

  }

  // Add to ProvablePerson MerkleMap and updatePerson() on RootContract ...
  // this is just a Promise call and we do not wait for response !!!
  // updateProvablePerson(person);

  // Return the modified Person
  // return formatMutationResult(person);
};


// controller has to 

/*
1- Validate params

. get current state -> key, value0, root0, entity0

. update the db -> entity1

. update the merkle -> key, value1, root1

- run MINA tx

- check state === root1 

How can we recover if MINA TX fails ?

- rollback db OK -> key, entity0
- rollback merkle -> key,valu0

*/

async function updateMinaOrRevert(mapid: number, uid: string, unsafeParams: any) {


  const entity0 = await prisma.person.findUnique({
    where: { uid: uid }
  });
  if (!person) throw new Error(`ERR: Update person ${uid} failed`);

  let params = PersonSchemaPartial.safeParse(unsafeParams);
  console.log("Zod saveParse=", params);

  const person = await prisma.person.update({
    where: { uid: uid },
    data: { ...params },
  });
  if (!person) throw new Error(`ERR: Update person ${uid} failed`);
  



}