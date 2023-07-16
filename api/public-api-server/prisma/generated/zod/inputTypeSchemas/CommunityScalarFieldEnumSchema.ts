import { z } from 'zod';

export const CommunityScalarFieldEnumSchema = z.enum(['uid','accountId','adminUid','state','name','description','image','createdUtc','updatedUtc','approvedUtc']);

export default CommunityScalarFieldEnumSchema;
