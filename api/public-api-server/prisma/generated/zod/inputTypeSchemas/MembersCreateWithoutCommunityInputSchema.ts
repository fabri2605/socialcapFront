import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PersonCreateNestedOneWithoutMembersInputSchema } from './PersonCreateNestedOneWithoutMembersInputSchema';

export const MembersCreateWithoutCommunityInputSchema: z.ZodType<Prisma.MembersCreateWithoutCommunityInput> = z.object({
  role: z.string().max(32).optional(),
  createdUtc: z.coerce.date().optional(),
  approvedUtc: z.coerce.date().optional().nullable(),
  person: z.lazy(() => PersonCreateNestedOneWithoutMembersInputSchema)
}).strict();

export default MembersCreateWithoutCommunityInputSchema;
