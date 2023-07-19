"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembersPartialSchema = exports.MembersSchema = exports.CommunityPartialSchema = exports.CommunitySchema = exports.PersonPartialSchema = exports.PersonSchema = exports.SessionPartialSchema = exports.SessionSchema = exports.MerkleMapLeafPartialSchema = exports.MerkleMapLeafSchema = exports.MerkleMapPartialSchema = exports.MerkleMapSchema = exports.NullsOrderSchema = exports.QueryModeSchema = exports.SortOrderSchema = exports.MembersScalarFieldEnumSchema = exports.CommunityScalarFieldEnumSchema = exports.PersonScalarFieldEnumSchema = exports.SessionScalarFieldEnumSchema = exports.MerkleMapLeafScalarFieldEnumSchema = exports.MerkleMapScalarFieldEnumSchema = exports.TransactionIsolationLevelSchema = void 0;
const zod_1 = require("zod");
/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////
/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////
exports.TransactionIsolationLevelSchema = zod_1.z.enum(['ReadUncommitted', 'ReadCommitted', 'RepeatableRead', 'Serializable']);
exports.MerkleMapScalarFieldEnumSchema = zod_1.z.enum(['id', 'name', 'root', 'size', 'height', 'createdUtc', 'updatedUtc']);
exports.MerkleMapLeafScalarFieldEnumSchema = zod_1.z.enum(['uid', 'mapId', 'index', 'key', 'hash', 'data', 'createdUtc', 'updatedUtc']);
exports.SessionScalarFieldEnumSchema = zod_1.z.enum(['uid', 'otp', 'email', 'createdUtc', 'updatedUtc']);
exports.PersonScalarFieldEnumSchema = zod_1.z.enum(['uid', 'accountId', 'state', 'fullName', 'description', 'image', 'email', 'phone', 'telegram', 'preferences', 'createdUTC', 'updatedUTC', 'approvedUTC']);
exports.CommunityScalarFieldEnumSchema = zod_1.z.enum(['uid', 'accountId', 'adminUid', 'state', 'name', 'description', 'image', 'createdUtc', 'updatedUtc', 'approvedUtc']);
exports.MembersScalarFieldEnumSchema = zod_1.z.enum(['communityUid', 'personUid', 'role', 'createdUtc', 'approvedUtc']);
exports.SortOrderSchema = zod_1.z.enum(['asc', 'desc']);
exports.QueryModeSchema = zod_1.z.enum(['default', 'insensitive']);
exports.NullsOrderSchema = zod_1.z.enum(['first', 'last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////
/////////////////////////////////////////
// MERKLE MAP SCHEMA
/////////////////////////////////////////
exports.MerkleMapSchema = zod_1.z.object({
    id: zod_1.z.number().int(),
    name: zod_1.z.string(),
    root: zod_1.z.bigint(),
    size: zod_1.z.number().int(),
    height: zod_1.z.number().int(),
    createdUtc: zod_1.z.coerce.date(),
    updatedUtc: zod_1.z.coerce.date(),
});
/////////////////////////////////////////
// MERKLE MAP PARTIAL SCHEMA
/////////////////////////////////////////
exports.MerkleMapPartialSchema = exports.MerkleMapSchema.partial();
/////////////////////////////////////////
// MERKLE MAP LEAF SCHEMA
/////////////////////////////////////////
exports.MerkleMapLeafSchema = zod_1.z.object({
    uid: zod_1.z.string().uuid(),
    mapId: zod_1.z.number().int(),
    index: zod_1.z.bigint(),
    key: zod_1.z.string(),
    hash: zod_1.z.string(),
    data: zod_1.z.string().nullish(),
    createdUtc: zod_1.z.coerce.date(),
    updatedUtc: zod_1.z.coerce.date(),
});
/////////////////////////////////////////
// MERKLE MAP LEAF PARTIAL SCHEMA
/////////////////////////////////////////
exports.MerkleMapLeafPartialSchema = exports.MerkleMapLeafSchema.partial();
/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////
exports.SessionSchema = zod_1.z.object({
    uid: zod_1.z.string().max(36),
    otp: zod_1.z.string().min(6).max(8),
    email: zod_1.z.string().email().min(5).max(128),
    createdUtc: zod_1.z.coerce.date(),
    updatedUtc: zod_1.z.coerce.date(),
});
/////////////////////////////////////////
// SESSION PARTIAL SCHEMA
/////////////////////////////////////////
exports.SessionPartialSchema = exports.SessionSchema.partial();
/////////////////////////////////////////
// PERSON SCHEMA
/////////////////////////////////////////
exports.PersonSchema = zod_1.z.object({
    uid: zod_1.z.string().max(32),
    accountId: zod_1.z.string().max(32).nullish(),
    state: zod_1.z.string().min(1).max(12),
    fullName: zod_1.z.string().min(3).max(128),
    description: zod_1.z.string().max(128).nullish(),
    image: zod_1.z.string().url().max(128).nullish(),
    email: zod_1.z.string().email().min(5).max(128),
    phone: zod_1.z.string().max(128).nullish(),
    telegram: zod_1.z.string().max(128).nullish(),
    preferences: zod_1.z.string().nullish(),
    createdUTC: zod_1.z.coerce.date(),
    updatedUTC: zod_1.z.coerce.date().nullish(),
    approvedUTC: zod_1.z.coerce.date().nullish(),
});
/////////////////////////////////////////
// PERSON PARTIAL SCHEMA
/////////////////////////////////////////
exports.PersonPartialSchema = exports.PersonSchema.partial();
/////////////////////////////////////////
// COMMUNITY SCHEMA
/////////////////////////////////////////
exports.CommunitySchema = zod_1.z.object({
    uid: zod_1.z.string().max(32),
    accountId: zod_1.z.string().max(32).nullish(),
    adminUid: zod_1.z.string().max(32),
    state: zod_1.z.string().min(1).max(12),
    name: zod_1.z.string().min(3).max(128),
    description: zod_1.z.string().max(128).nullish(),
    image: zod_1.z.string().url().max(128).nullish(),
    createdUtc: zod_1.z.coerce.date(),
    updatedUtc: zod_1.z.coerce.date(),
    approvedUtc: zod_1.z.coerce.date().nullish(),
});
/////////////////////////////////////////
// COMMUNITY PARTIAL SCHEMA
/////////////////////////////////////////
exports.CommunityPartialSchema = exports.CommunitySchema.partial();
/////////////////////////////////////////
// MEMBERS SCHEMA
/////////////////////////////////////////
exports.MembersSchema = zod_1.z.object({
    communityUid: zod_1.z.string().max(32),
    personUid: zod_1.z.string().max(32),
    /**
     * // PLAIN, VALIDATOR, AUDITOR
     */
    role: zod_1.z.string().max(32),
    createdUtc: zod_1.z.coerce.date(),
    approvedUtc: zod_1.z.coerce.date().nullish(),
});
/////////////////////////////////////////
// MEMBERS PARTIAL SCHEMA
/////////////////////////////////////////
exports.MembersPartialSchema = exports.MembersSchema.partial();
