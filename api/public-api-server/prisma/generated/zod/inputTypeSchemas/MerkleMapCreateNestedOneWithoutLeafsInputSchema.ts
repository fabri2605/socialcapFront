import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MerkleMapCreateWithoutLeafsInputSchema } from './MerkleMapCreateWithoutLeafsInputSchema';
import { MerkleMapUncheckedCreateWithoutLeafsInputSchema } from './MerkleMapUncheckedCreateWithoutLeafsInputSchema';
import { MerkleMapCreateOrConnectWithoutLeafsInputSchema } from './MerkleMapCreateOrConnectWithoutLeafsInputSchema';
import { MerkleMapWhereUniqueInputSchema } from './MerkleMapWhereUniqueInputSchema';

export const MerkleMapCreateNestedOneWithoutLeafsInputSchema: z.ZodType<Prisma.MerkleMapCreateNestedOneWithoutLeafsInput> = z.object({
  create: z.union([ z.lazy(() => MerkleMapCreateWithoutLeafsInputSchema),z.lazy(() => MerkleMapUncheckedCreateWithoutLeafsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MerkleMapCreateOrConnectWithoutLeafsInputSchema).optional(),
  connect: z.lazy(() => MerkleMapWhereUniqueInputSchema).optional()
}).strict();

export default MerkleMapCreateNestedOneWithoutLeafsInputSchema;
