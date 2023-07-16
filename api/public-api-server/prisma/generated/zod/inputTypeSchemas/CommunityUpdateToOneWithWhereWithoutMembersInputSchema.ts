import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { CommunityWhereInputSchema } from './CommunityWhereInputSchema';
import { CommunityUpdateWithoutMembersInputSchema } from './CommunityUpdateWithoutMembersInputSchema';
import { CommunityUncheckedUpdateWithoutMembersInputSchema } from './CommunityUncheckedUpdateWithoutMembersInputSchema';

export const CommunityUpdateToOneWithWhereWithoutMembersInputSchema: z.ZodType<Prisma.CommunityUpdateToOneWithWhereWithoutMembersInput> = z.object({
  where: z.lazy(() => CommunityWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CommunityUpdateWithoutMembersInputSchema),z.lazy(() => CommunityUncheckedUpdateWithoutMembersInputSchema) ]),
}).strict();

export default CommunityUpdateToOneWithWhereWithoutMembersInputSchema;
