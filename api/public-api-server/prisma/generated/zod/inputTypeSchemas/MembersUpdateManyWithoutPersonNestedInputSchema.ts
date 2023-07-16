import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MembersCreateWithoutPersonInputSchema } from './MembersCreateWithoutPersonInputSchema';
import { MembersUncheckedCreateWithoutPersonInputSchema } from './MembersUncheckedCreateWithoutPersonInputSchema';
import { MembersCreateOrConnectWithoutPersonInputSchema } from './MembersCreateOrConnectWithoutPersonInputSchema';
import { MembersUpsertWithWhereUniqueWithoutPersonInputSchema } from './MembersUpsertWithWhereUniqueWithoutPersonInputSchema';
import { MembersCreateManyPersonInputEnvelopeSchema } from './MembersCreateManyPersonInputEnvelopeSchema';
import { MembersWhereUniqueInputSchema } from './MembersWhereUniqueInputSchema';
import { MembersUpdateWithWhereUniqueWithoutPersonInputSchema } from './MembersUpdateWithWhereUniqueWithoutPersonInputSchema';
import { MembersUpdateManyWithWhereWithoutPersonInputSchema } from './MembersUpdateManyWithWhereWithoutPersonInputSchema';
import { MembersScalarWhereInputSchema } from './MembersScalarWhereInputSchema';

export const MembersUpdateManyWithoutPersonNestedInputSchema: z.ZodType<Prisma.MembersUpdateManyWithoutPersonNestedInput> = z.object({
  create: z.union([ z.lazy(() => MembersCreateWithoutPersonInputSchema),z.lazy(() => MembersCreateWithoutPersonInputSchema).array(),z.lazy(() => MembersUncheckedCreateWithoutPersonInputSchema),z.lazy(() => MembersUncheckedCreateWithoutPersonInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MembersCreateOrConnectWithoutPersonInputSchema),z.lazy(() => MembersCreateOrConnectWithoutPersonInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MembersUpsertWithWhereUniqueWithoutPersonInputSchema),z.lazy(() => MembersUpsertWithWhereUniqueWithoutPersonInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MembersCreateManyPersonInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MembersWhereUniqueInputSchema),z.lazy(() => MembersWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MembersWhereUniqueInputSchema),z.lazy(() => MembersWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MembersWhereUniqueInputSchema),z.lazy(() => MembersWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MembersWhereUniqueInputSchema),z.lazy(() => MembersWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MembersUpdateWithWhereUniqueWithoutPersonInputSchema),z.lazy(() => MembersUpdateWithWhereUniqueWithoutPersonInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MembersUpdateManyWithWhereWithoutPersonInputSchema),z.lazy(() => MembersUpdateManyWithWhereWithoutPersonInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MembersScalarWhereInputSchema),z.lazy(() => MembersScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default MembersUpdateManyWithoutPersonNestedInputSchema;
