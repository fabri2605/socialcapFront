import { z } from 'zod';

/////////////////////////////////////////
// COMMUNITY SCHEMA
/////////////////////////////////////////

export const CommunitySchema = z.object({
  uid: z.string().max(32),
  accountId: z.string().max(32).nullable(),
  adminUid: z.string().max(32),
  state: z.string().min(1).max(12),
  name: z.string().min(3).max(128),
  description: z.string().max(128).nullable(),
  image: z.string().url().max(128).nullable(),
  createdUtc: z.coerce.date(),
  updatedUtc: z.coerce.date(),
  approvedUtc: z.coerce.date(),
})

export type Community = z.infer<typeof CommunitySchema>

export default CommunitySchema;
