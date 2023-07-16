import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MerkleMapUpdateWithoutLeafsInputSchema } from './MerkleMapUpdateWithoutLeafsInputSchema';
import { MerkleMapUncheckedUpdateWithoutLeafsInputSchema } from './MerkleMapUncheckedUpdateWithoutLeafsInputSchema';
import { MerkleMapCreateWithoutLeafsInputSchema } from './MerkleMapCreateWithoutLeafsInputSchema';
import { MerkleMapUncheckedCreateWithoutLeafsInputSchema } from './MerkleMapUncheckedCreateWithoutLeafsInputSchema';
import { MerkleMapWhereInputSchema } from './MerkleMapWhereInputSchema';

export const MerkleMapUpsertWithoutLeafsInputSchema: z.ZodType<Prisma.MerkleMapUpsertWithoutLeafsInput> = z.object({
  update: z.union([ z.lazy(() => MerkleMapUpdateWithoutLeafsInputSchema),z.lazy(() => MerkleMapUncheckedUpdateWithoutLeafsInputSchema) ]),
  create: z.union([ z.lazy(() => MerkleMapCreateWithoutLeafsInputSchema),z.lazy(() => MerkleMapUncheckedCreateWithoutLeafsInputSchema) ]),
  where: z.lazy(() => MerkleMapWhereInputSchema).optional()
}).strict();

export default MerkleMapUpsertWithoutLeafsInputSchema;
