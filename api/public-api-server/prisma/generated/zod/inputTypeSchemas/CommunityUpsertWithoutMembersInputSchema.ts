import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { CommunityUpdateWithoutMembersInputSchema } from './CommunityUpdateWithoutMembersInputSchema';
import { CommunityUncheckedUpdateWithoutMembersInputSchema } from './CommunityUncheckedUpdateWithoutMembersInputSchema';
import { CommunityCreateWithoutMembersInputSchema } from './CommunityCreateWithoutMembersInputSchema';
import { CommunityUncheckedCreateWithoutMembersInputSchema } from './CommunityUncheckedCreateWithoutMembersInputSchema';
import { CommunityWhereInputSchema } from './CommunityWhereInputSchema';

export const CommunityUpsertWithoutMembersInputSchema: z.ZodType<Prisma.CommunityUpsertWithoutMembersInput> = z.object({
  update: z.union([ z.lazy(() => CommunityUpdateWithoutMembersInputSchema),z.lazy(() => CommunityUncheckedUpdateWithoutMembersInputSchema) ]),
  create: z.union([ z.lazy(() => CommunityCreateWithoutMembersInputSchema),z.lazy(() => CommunityUncheckedCreateWithoutMembersInputSchema) ]),
  where: z.lazy(() => CommunityWhereInputSchema).optional()
}).strict();

export default CommunityUpsertWithoutMembersInputSchema;
