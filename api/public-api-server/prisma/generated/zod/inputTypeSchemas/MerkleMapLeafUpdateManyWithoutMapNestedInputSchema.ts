import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MerkleMapLeafCreateWithoutMapInputSchema } from './MerkleMapLeafCreateWithoutMapInputSchema';
import { MerkleMapLeafUncheckedCreateWithoutMapInputSchema } from './MerkleMapLeafUncheckedCreateWithoutMapInputSchema';
import { MerkleMapLeafCreateOrConnectWithoutMapInputSchema } from './MerkleMapLeafCreateOrConnectWithoutMapInputSchema';
import { MerkleMapLeafUpsertWithWhereUniqueWithoutMapInputSchema } from './MerkleMapLeafUpsertWithWhereUniqueWithoutMapInputSchema';
import { MerkleMapLeafCreateManyMapInputEnvelopeSchema } from './MerkleMapLeafCreateManyMapInputEnvelopeSchema';
import { MerkleMapLeafWhereUniqueInputSchema } from './MerkleMapLeafWhereUniqueInputSchema';
import { MerkleMapLeafUpdateWithWhereUniqueWithoutMapInputSchema } from './MerkleMapLeafUpdateWithWhereUniqueWithoutMapInputSchema';
import { MerkleMapLeafUpdateManyWithWhereWithoutMapInputSchema } from './MerkleMapLeafUpdateManyWithWhereWithoutMapInputSchema';
import { MerkleMapLeafScalarWhereInputSchema } from './MerkleMapLeafScalarWhereInputSchema';

export const MerkleMapLeafUpdateManyWithoutMapNestedInputSchema: z.ZodType<Prisma.MerkleMapLeafUpdateManyWithoutMapNestedInput> = z.object({
  create: z.union([ z.lazy(() => MerkleMapLeafCreateWithoutMapInputSchema),z.lazy(() => MerkleMapLeafCreateWithoutMapInputSchema).array(),z.lazy(() => MerkleMapLeafUncheckedCreateWithoutMapInputSchema),z.lazy(() => MerkleMapLeafUncheckedCreateWithoutMapInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MerkleMapLeafCreateOrConnectWithoutMapInputSchema),z.lazy(() => MerkleMapLeafCreateOrConnectWithoutMapInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MerkleMapLeafUpsertWithWhereUniqueWithoutMapInputSchema),z.lazy(() => MerkleMapLeafUpsertWithWhereUniqueWithoutMapInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MerkleMapLeafCreateManyMapInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MerkleMapLeafWhereUniqueInputSchema),z.lazy(() => MerkleMapLeafWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MerkleMapLeafWhereUniqueInputSchema),z.lazy(() => MerkleMapLeafWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MerkleMapLeafWhereUniqueInputSchema),z.lazy(() => MerkleMapLeafWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MerkleMapLeafWhereUniqueInputSchema),z.lazy(() => MerkleMapLeafWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MerkleMapLeafUpdateWithWhereUniqueWithoutMapInputSchema),z.lazy(() => MerkleMapLeafUpdateWithWhereUniqueWithoutMapInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MerkleMapLeafUpdateManyWithWhereWithoutMapInputSchema),z.lazy(() => MerkleMapLeafUpdateManyWithWhereWithoutMapInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MerkleMapLeafScalarWhereInputSchema),z.lazy(() => MerkleMapLeafScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default MerkleMapLeafUpdateManyWithoutMapNestedInputSchema;
