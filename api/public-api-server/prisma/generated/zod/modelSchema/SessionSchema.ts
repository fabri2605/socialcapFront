import { z } from 'zod';

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

export default SessionSchema;
