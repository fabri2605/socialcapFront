import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { CommunityCreateNestedOneWithoutMembersInputSchema } from './CommunityCreateNestedOneWithoutMembersInputSchema';
import { PersonCreateNestedOneWithoutMembersInputSchema } from './PersonCreateNestedOneWithoutMembersInputSchema';

export const MembersCreateInputSchema: z.ZodType<Prisma.MembersCreateInput> = z.object({
  role: z.string().max(32).optional(),
  createdUtc: z.coerce.date().optional(),
  approvedUtc: z.coerce.date().optional().nullable(),
  community: z.lazy(() => CommunityCreateNestedOneWithoutMembersInputSchema),
  person: z.lazy(() => PersonCreateNestedOneWithoutMembersInputSchema)
}).strict();

export default MembersCreateInputSchema;
