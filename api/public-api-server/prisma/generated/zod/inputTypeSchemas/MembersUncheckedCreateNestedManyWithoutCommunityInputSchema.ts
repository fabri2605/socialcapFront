import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MembersCreateWithoutCommunityInputSchema } from './MembersCreateWithoutCommunityInputSchema';
import { MembersUncheckedCreateWithoutCommunityInputSchema } from './MembersUncheckedCreateWithoutCommunityInputSchema';
import { MembersCreateOrConnectWithoutCommunityInputSchema } from './MembersCreateOrConnectWithoutCommunityInputSchema';
import { MembersCreateManyCommunityInputEnvelopeSchema } from './MembersCreateManyCommunityInputEnvelopeSchema';
import { MembersWhereUniqueInputSchema } from './MembersWhereUniqueInputSchema';

export const MembersUncheckedCreateNestedManyWithoutCommunityInputSchema: z.ZodType<Prisma.MembersUncheckedCreateNestedManyWithoutCommunityInput> = z.object({
  create: z.union([ z.lazy(() => MembersCreateWithoutCommunityInputSchema),z.lazy(() => MembersCreateWithoutCommunityInputSchema).array(),z.lazy(() => MembersUncheckedCreateWithoutCommunityInputSchema),z.lazy(() => MembersUncheckedCreateWithoutCommunityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MembersCreateOrConnectWithoutCommunityInputSchema),z.lazy(() => MembersCreateOrConnectWithoutCommunityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MembersCreateManyCommunityInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MembersWhereUniqueInputSchema),z.lazy(() => MembersWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default MembersUncheckedCreateNestedManyWithoutCommunityInputSchema;
