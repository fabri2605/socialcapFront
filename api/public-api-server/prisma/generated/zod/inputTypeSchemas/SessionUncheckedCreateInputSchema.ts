import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  uid: z.string().max(36).optional(),
  otp: z.string().min(6).max(8),
  email: z.string().email().min(5).max(128),
  createdUtc: z.coerce.date().optional(),
  updatedUtc: z.coerce.date().optional()
}).strict();

export default SessionUncheckedCreateInputSchema;
