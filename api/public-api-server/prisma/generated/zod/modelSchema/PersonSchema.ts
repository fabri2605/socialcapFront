import { z } from 'zod';

/////////////////////////////////////////
// PERSON SCHEMA
/////////////////////////////////////////

export const PersonSchema = z.object({
  uid: z.string().max(32),
  accountId: z.string().max(32).nullable(),
  state: z.string().min(1).max(12),
  fullName: z.string().min(3).max(128),
  description: z.string().max(128).nullable(),
  image: z.string().url().max(128).nullable(),
  email: z.string().email().min(5).max(128),
  phone: z.string().max(128).nullable(),
  telegram: z.string().max(128).nullable(),
  preferences: z.string().nullable(),
  createdUTC: z.coerce.date(),
  updatedUTC: z.coerce.date().nullable(),
  approvedUTC: z.coerce.date().nullable(),
})

export type Person = z.infer<typeof PersonSchema>

export default PersonSchema;
