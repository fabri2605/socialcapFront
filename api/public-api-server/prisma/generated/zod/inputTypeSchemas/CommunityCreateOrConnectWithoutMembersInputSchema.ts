import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { CommunityWhereUniqueInputSchema } from './CommunityWhereUniqueInputSchema';
import { CommunityCreateWithoutMembersInputSchema } from './CommunityCreateWithoutMembersInputSchema';
import { CommunityUncheckedCreateWithoutMembersInputSchema } from './CommunityUncheckedCreateWithoutMembersInputSchema';

export const CommunityCreateOrConnectWithoutMembersInputSchema: z.ZodType<Prisma.CommunityCreateOrConnectWithoutMembersInput> = z.object({
  where: z.lazy(() => CommunityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommunityCreateWithoutMembersInputSchema),z.lazy(() => CommunityUncheckedCreateWithoutMembersInputSchema) ]),
}).strict();

export default CommunityCreateOrConnectWithoutMembersInputSchema;
