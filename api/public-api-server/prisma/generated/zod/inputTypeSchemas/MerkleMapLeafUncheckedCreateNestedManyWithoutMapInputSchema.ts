import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MerkleMapLeafCreateWithoutMapInputSchema } from './MerkleMapLeafCreateWithoutMapInputSchema';
import { MerkleMapLeafUncheckedCreateWithoutMapInputSchema } from './MerkleMapLeafUncheckedCreateWithoutMapInputSchema';
import { MerkleMapLeafCreateOrConnectWithoutMapInputSchema } from './MerkleMapLeafCreateOrConnectWithoutMapInputSchema';
import { MerkleMapLeafCreateManyMapInputEnvelopeSchema } from './MerkleMapLeafCreateManyMapInputEnvelopeSchema';
import { MerkleMapLeafWhereUniqueInputSchema } from './MerkleMapLeafWhereUniqueInputSchema';

export const MerkleMapLeafUncheckedCreateNestedManyWithoutMapInputSchema: z.ZodType<Prisma.MerkleMapLeafUncheckedCreateNestedManyWithoutMapInput> = z.object({
  create: z.union([ z.lazy(() => MerkleMapLeafCreateWithoutMapInputSchema),z.lazy(() => MerkleMapLeafCreateWithoutMapInputSchema).array(),z.lazy(() => MerkleMapLeafUncheckedCreateWithoutMapInputSchema),z.lazy(() => MerkleMapLeafUncheckedCreateWithoutMapInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MerkleMapLeafCreateOrConnectWithoutMapInputSchema),z.lazy(() => MerkleMapLeafCreateOrConnectWithoutMapInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MerkleMapLeafCreateManyMapInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MerkleMapLeafWhereUniqueInputSchema),z.lazy(() => MerkleMapLeafWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default MerkleMapLeafUncheckedCreateNestedManyWithoutMapInputSchema;
