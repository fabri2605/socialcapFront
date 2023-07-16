import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const MerkleMapLeafSumOrderByAggregateInputSchema: z.ZodType<Prisma.MerkleMapLeafSumOrderByAggregateInput> = z.object({
  mapId: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default MerkleMapLeafSumOrderByAggregateInputSchema;
