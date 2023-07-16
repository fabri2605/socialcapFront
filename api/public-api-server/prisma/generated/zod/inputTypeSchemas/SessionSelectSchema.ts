import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  uid: z.boolean().optional(),
  otp: z.boolean().optional(),
  email: z.boolean().optional(),
  createdUtc: z.boolean().optional(),
  updatedUtc: z.boolean().optional(),
}).strict()

export default SessionSelectSchema;
