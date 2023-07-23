import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const MerkleMapScalarFieldEnumSchema = z.enum(['id','name','root','size','height','createdUtc','updatedUtc']);

export const MerkleMapLeafScalarFieldEnumSchema = z.enum(['uid','mapId','index','key','hash','data','createdUtc','updatedUtc']);

export const SessionScalarFieldEnumSchema = z.enum(['uid','otp','email','createdUtc','updatedUtc']);

export const PersonScalarFieldEnumSchema = z.enum(['uid','accountId','state','fullName','description','image','email','phone','telegram','preferences','createdUTC','updatedUTC','approvedUTC']);

export const CommunityScalarFieldEnumSchema = z.enum(['uid','accountId','adminUid','state','name','description','image','createdUTC','updatedUTC','approvedUTC']);

export const MembersScalarFieldEnumSchema = z.enum(['uid','communityUid','personUid','role','createdUTC','approvedUTC']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// MERKLE MAP SCHEMA
/////////////////////////////////////////

export const MerkleMapSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  root: z.bigint(),
  size: z.number().int(),
  height: z.number().int(),
  createdUtc: z.coerce.date(),
  updatedUtc: z.coerce.date(),
})

export type MerkleMap = z.infer<typeof MerkleMapSchema>

/////////////////////////////////////////
// MERKLE MAP PARTIAL SCHEMA
/////////////////////////////////////////

export const MerkleMapPartialSchema = MerkleMapSchema.partial()

export type MerkleMapPartial = z.infer<typeof MerkleMapPartialSchema>

/////////////////////////////////////////
// MERKLE MAP LEAF SCHEMA
/////////////////////////////////////////

export const MerkleMapLeafSchema = z.object({
  uid: z.string().uuid(),
  mapId: z.number().int(),
  index: z.bigint(),
  key: z.string(),
  hash: z.string(),
  data: z.string().nullish(),
  createdUtc: z.coerce.date(),
  updatedUtc: z.coerce.date(),
})

export type MerkleMapLeaf = z.infer<typeof MerkleMapLeafSchema>

/////////////////////////////////////////
// MERKLE MAP LEAF PARTIAL SCHEMA
/////////////////////////////////////////

export const MerkleMapLeafPartialSchema = MerkleMapLeafSchema.partial()

export type MerkleMapLeafPartial = z.infer<typeof MerkleMapLeafPartialSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  uid: z.string().max(36),
  otp: z.string().min(6).max(8),
  email: z.string().email().min(5).max(128),
  createdUtc: z.coerce.date(),
  updatedUtc: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// SESSION PARTIAL SCHEMA
/////////////////////////////////////////

export const SessionPartialSchema = SessionSchema.partial()

export type SessionPartial = z.infer<typeof SessionPartialSchema>

/////////////////////////////////////////
// PERSON SCHEMA
/////////////////////////////////////////

export const PersonSchema = z.object({
  uid: z.string().max(32),
  accountId: z.string().max(32).nullish(),
  state: z.string().min(1).max(12),
  fullName: z.string().min(3).max(128),
  description: z.string().max(128).nullish(),
  image: z.string().max(128).nullish(),
  email: z.string().email().min(5).max(128),
  phone: z.string().max(128).nullish(),
  telegram: z.string().max(128).nullish(),
  preferences: z.string().nullish(),
  createdUTC: z.coerce.date(),
  updatedUTC: z.coerce.date().nullish(),
  approvedUTC: z.coerce.date().nullish(),
})

export type Person = z.infer<typeof PersonSchema>

/////////////////////////////////////////
// PERSON PARTIAL SCHEMA
/////////////////////////////////////////

export const PersonPartialSchema = PersonSchema.partial()

export type PersonPartial = z.infer<typeof PersonPartialSchema>

/////////////////////////////////////////
// COMMUNITY SCHEMA
/////////////////////////////////////////

export const CommunitySchema = z.object({
  uid: z.string().max(32),
  accountId: z.string().max(32).nullish(),
  adminUid: z.string().max(32),
  state: z.string().min(1).max(12),
  name: z.string().min(3).max(128),
  description: z.string().max(128).nullish(),
  image: z.string().url().max(128).nullish(),
  createdUTC: z.coerce.date(),
  updatedUTC: z.coerce.date(),
  approvedUTC: z.coerce.date().nullish(),
})

export type Community = z.infer<typeof CommunitySchema>

/////////////////////////////////////////
// COMMUNITY PARTIAL SCHEMA
/////////////////////////////////////////

export const CommunityPartialSchema = CommunitySchema.partial()

export type CommunityPartial = z.infer<typeof CommunityPartialSchema>

/////////////////////////////////////////
// MEMBERS SCHEMA
/////////////////////////////////////////

export const MembersSchema = z.object({
  uid: z.string(),
  communityUid: z.string().max(32),
  personUid: z.string().max(32),
  /**
   * // PLAIN, VALIDATOR, AUDITOR
   */
  role: z.string().max(32),
  createdUTC: z.coerce.date(),
  approvedUTC: z.coerce.date().nullish(),
})

export type Members = z.infer<typeof MembersSchema>

/////////////////////////////////////////
// MEMBERS PARTIAL SCHEMA
/////////////////////////////////////////

export const MembersPartialSchema = MembersSchema.partial()

export type MembersPartial = z.infer<typeof MembersPartialSchema>
