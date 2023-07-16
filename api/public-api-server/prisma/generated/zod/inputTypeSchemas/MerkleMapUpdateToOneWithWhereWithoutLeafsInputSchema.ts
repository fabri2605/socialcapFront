import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MerkleMapWhereInputSchema } from './MerkleMapWhereInputSchema';
import { MerkleMapUpdateWithoutLeafsInputSchema } from './MerkleMapUpdateWithoutLeafsInputSchema';
import { MerkleMapUncheckedUpdateWithoutLeafsInputSchema } from './MerkleMapUncheckedUpdateWithoutLeafsInputSchema';

export const MerkleMapUpdateToOneWithWhereWithoutLeafsInputSchema: z.ZodType<Prisma.MerkleMapUpdateToOneWithWhereWithoutLeafsInput> = z.object({
  where: z.lazy(() => MerkleMapWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => MerkleMapUpdateWithoutLeafsInputSchema),z.lazy(() => MerkleMapUncheckedUpdateWithoutLeafsInputSchema) ]),
}).strict();

export default MerkleMapUpdateToOneWithWhereWithoutLeafsInputSchema;
