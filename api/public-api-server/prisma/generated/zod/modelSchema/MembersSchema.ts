import { z } from 'zod';

/////////////////////////////////////////
// MEMBERS SCHEMA
/////////////////////////////////////////

export const MembersSchema = z.object({
  communityUid: z.string().max(32),
  personUid: z.string().max(32),
  /**
   * // PLAIN, VALIDATOR, AUDITOR
   */
  role: z.string().max(32),
  createdUtc: z.coerce.date(),
  approvedUtc: z.coerce.date().nullable(),
})

export type Members = z.infer<typeof MembersSchema>

export default MembersSchema;
