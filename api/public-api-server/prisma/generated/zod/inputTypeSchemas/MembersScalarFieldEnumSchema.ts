import { z } from 'zod';

export const MembersScalarFieldEnumSchema = z.enum(['communityUid','personUid','role','createdUtc','approvedUtc']);

export default MembersScalarFieldEnumSchema;
