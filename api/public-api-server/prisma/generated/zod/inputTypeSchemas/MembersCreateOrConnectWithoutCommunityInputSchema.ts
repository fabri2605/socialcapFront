import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MembersWhereUniqueInputSchema } from './MembersWhereUniqueInputSchema';
import { MembersCreateWithoutCommunityInputSchema } from './MembersCreateWithoutCommunityInputSchema';
import { MembersUncheckedCreateWithoutCommunityInputSchema } from './MembersUncheckedCreateWithoutCommunityInputSchema';

export const MembersCreateOrConnectWithoutCommunityInputSchema: z.ZodType<Prisma.MembersCreateOrConnectWithoutCommunityInput> = z.object({
  where: z.lazy(() => MembersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MembersCreateWithoutCommunityInputSchema),z.lazy(() => MembersUncheckedCreateWithoutCommunityInputSchema) ]),
}).strict();

export default MembersCreateOrConnectWithoutCommunityInputSchema;
