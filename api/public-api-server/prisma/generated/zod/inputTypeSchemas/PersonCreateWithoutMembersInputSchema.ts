import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const PersonCreateWithoutMembersInputSchema: z.ZodType<Prisma.PersonCreateWithoutMembersInput> = z.object({
  uid: z.string().max(32),
  accountId: z.string().max(32).optional().nullable(),
  state: z.string().min(1).max(12),
  fullName: z.string().min(3).max(128),
  description: z.string().max(128).optional().nullable(),
  image: z.string().url().max(128).optional().nullable(),
  email: z.string().email().min(5).max(128),
  phone: z.string().max(128).optional().nullable(),
  telegram: z.string().max(128).optional().nullable(),
  preferences: z.string().optional().nullable(),
  createdUTC: z.coerce.date().optional(),
  updatedUTC: z.coerce.date().optional().nullable(),
  approvedUTC: z.coerce.date().optional().nullable()
}).strict();

export default PersonCreateWithoutMembersInputSchema;
