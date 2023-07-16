import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const MerkleMapLeafAvgOrderByAggregateInputSchema: z.ZodType<Prisma.MerkleMapLeafAvgOrderByAggregateInput> = z.object({
  mapId: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default MerkleMapLeafAvgOrderByAggregateInputSchema;
