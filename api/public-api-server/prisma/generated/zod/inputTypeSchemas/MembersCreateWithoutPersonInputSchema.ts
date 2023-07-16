import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { CommunityCreateNestedOneWithoutMembersInputSchema } from './CommunityCreateNestedOneWithoutMembersInputSchema';

export const MembersCreateWithoutPersonInputSchema: z.ZodType<Prisma.MembersCreateWithoutPersonInput> = z.object({
  role: z.string().max(32).optional(),
  createdUtc: z.coerce.date().optional(),
  approvedUtc: z.coerce.date().optional().nullable(),
  community: z.lazy(() => CommunityCreateNestedOneWithoutMembersInputSchema)
}).strict();

export default MembersCreateWithoutPersonInputSchema;
