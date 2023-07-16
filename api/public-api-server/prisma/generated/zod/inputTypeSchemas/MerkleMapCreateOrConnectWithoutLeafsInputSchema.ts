import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MerkleMapWhereUniqueInputSchema } from './MerkleMapWhereUniqueInputSchema';
import { MerkleMapCreateWithoutLeafsInputSchema } from './MerkleMapCreateWithoutLeafsInputSchema';
import { MerkleMapUncheckedCreateWithoutLeafsInputSchema } from './MerkleMapUncheckedCreateWithoutLeafsInputSchema';

export const MerkleMapCreateOrConnectWithoutLeafsInputSchema: z.ZodType<Prisma.MerkleMapCreateOrConnectWithoutLeafsInput> = z.object({
  where: z.lazy(() => MerkleMapWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MerkleMapCreateWithoutLeafsInputSchema),z.lazy(() => MerkleMapUncheckedCreateWithoutLeafsInputSchema) ]),
}).strict();

export default MerkleMapCreateOrConnectWithoutLeafsInputSchema;
