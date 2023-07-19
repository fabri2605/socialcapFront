"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.signUp = void 0;
const global_1 = require("~/global");
const uid_1 = require("~/models/uid");
const messages_1 = require("~/i18n/messages");
const responses_1 = require("~/core/responses");
const index_1 = require("~/dbs/merkle/index");
const merkle_map_helpers_1 = require("~/dbs/merkle/merkle-map-helpers");
const person_helpers_1 = require("~/dbs/indexer/person-helpers");
const provable_person_1 = require("~/models/provable-person");
const mina_service_1 = require("~/services/mina-service");
/**
 * signUp
 * Starts the onboarding process for a new user.
 * @param params Object: { email, ... }
 * @returns MutationResult
 */
async function signUp(params) {
    // 1. If no email/full_name/account_id => Error BAD_REQUEST (incomplete params)
    if (!params.email)
        return responses_1.hasError.MissingParams(messages_1.i18n.missing_param("email", "sign_up"));
    if (!params.full_name)
        return responses_1.hasError.MissingParams(messages_1.i18n.missing_param("full_name", "sign_up"));
    // 2. If received email exists in `persons` table => Error CONFLICT (already exists)
    const noPerson = await global_1.prisma.person.findUnique({
        where: { email: params.email },
    });
    if (noPerson !== null)
        return responses_1.hasError.Conflict(messages_1.i18n.persons_already_registered(params.email));
    // 3. Create default values for fields 'avatar' and 'preferences'
    const defaultPrefs = "{}";
    // 4. Insert into `personas(email, state:PENDING, ...params)`
    const person = await global_1.prisma.person.create({
        data: {
            uid: uid_1.UID.uuid4(),
            accountId: "",
            state: person_helpers_1.PersonState.initial(),
            fullName: params.full_name,
            email: params.email,
            phone: params.phone || "",
            telegram: params.telegram || "",
            preferences: defaultPrefs,
        },
    });
    if (!person)
        return responses_1.hasError.DatabaseEngine(messages_1.i18n.database_error("insert into table Persons"));
    console.log(`sign_up params=`, params);
    console.log(`sign_up result=`, person);
    // 5. Add to ProvablePerson MerkleMap and updatePerson() on RootContract ...
    // this is just a Promise call and we do not wait for response !!!
    // updateProvablePerson(person);
    // 7. Return the fully created Person data
    return (0, responses_1.hasResult)(person);
}
exports.signUp = signUp;
async function updateProfile(params) {
    try {
        const uid = params.uid;
        const key = uid_1.UID.toField(uid);
        // update Indexer
        const person = await (0, person_helpers_1.updatePersonOrRaise)(uid, params);
        // update Merkle 
        const provable = new provable_person_1.ProvablePerson(person);
        const { map, updated, witness } = await (0, merkle_map_helpers_1.updateMerkleMapOrRaise)(index_1.PERSONS_MERKLE_MAP, uid, provable.hash());
        // call Mina service here ...
        await mina_service_1.MinaService.updatePersonsRootOrRaise(provable, map, witness, updated);
        return (0, responses_1.hasResult)(person);
    }
    catch (err) {
        return responses_1.hasError.This(err);
    }
}
exports.updateProfile = updateProfile;
