import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MembersCreateWithoutCommunityInputSchema } from './MembersCreateWithoutCommunityInputSchema';
import { MembersUncheckedCreateWithoutCommunityInputSchema } from './MembersUncheckedCreateWithoutCommunityInputSchema';
import { MembersCreateOrConnectWithoutCommunityInputSchema } from './MembersCreateOrConnectWithoutCommunityInputSchema';
import { MembersUpsertWithWhereUniqueWithoutCommunityInputSchema } from './MembersUpsertWithWhereUniqueWithoutCommunityInputSchema';
import { MembersCreateManyCommunityInputEnvelopeSchema } from './MembersCreateManyCommunityInputEnvelopeSchema';
import { MembersWhereUniqueInputSchema } from './MembersWhereUniqueInputSchema';
import { MembersUpdateWithWhereUniqueWithoutCommunityInputSchema } from './MembersUpdateWithWhereUniqueWithoutCommunityInputSchema';
import { MembersUpdateManyWithWhereWithoutCommunityInputSchema } from './MembersUpdateManyWithWhereWithoutCommunityInputSchema';
import { MembersScalarWhereInputSchema } from './MembersScalarWhereInputSchema';

export const MembersUpdateManyWithoutCommunityNestedInputSchema: z.ZodType<Prisma.MembersUpdateManyWithoutCommunityNestedInput> = z.object({
  create: z.union([ z.lazy(() => MembersCreateWithoutCommunityInputSchema),z.lazy(() => MembersCreateWithoutCommunityInputSchema).array(),z.lazy(() => MembersUncheckedCreateWithoutCommunityInputSchema),z.lazy(() => MembersUncheckedCreateWithoutCommunityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MembersCreateOrConnectWithoutCommunityInputSchema),z.lazy(() => MembersCreateOrConnectWithoutCommunityInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MembersUpsertWithWhereUniqueWithoutCommunityInputSchema),z.lazy(() => MembersUpsertWithWhereUniqueWithoutCommunityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MembersCreateManyCommunityInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MembersWhereUniqueInputSchema),z.lazy(() => MembersWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MembersWhereUniqueInputSchema),z.lazy(() => MembersWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MembersWhereUniqueInputSchema),z.lazy(() => MembersWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MembersWhereUniqueInputSchema),z.lazy(() => MembersWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MembersUpdateWithWhereUniqueWithoutCommunityInputSchema),z.lazy(() => MembersUpdateWithWhereUniqueWithoutCommunityInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MembersUpdateManyWithWhereWithoutCommunityInputSchema),z.lazy(() => MembersUpdateManyWithWhereWithoutCommunityInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MembersScalarWhereInputSchema),z.lazy(() => MembersScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default MembersUpdateManyWithoutCommunityNestedInputSchema;
