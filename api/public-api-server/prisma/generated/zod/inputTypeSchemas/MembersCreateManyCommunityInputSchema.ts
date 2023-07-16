import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const MembersCreateManyCommunityInputSchema: z.ZodType<Prisma.MembersCreateManyCommunityInput> = z.object({
  personUid: z.string().max(32),
  role: z.string().max(32).optional(),
  createdUtc: z.coerce.date().optional(),
  approvedUtc: z.coerce.date().optional().nullable()
}).strict();

export default MembersCreateManyCommunityInputSchema;
