import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const MerkleMapLeafOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MerkleMapLeafOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default MerkleMapLeafOrderByRelationAggregateInputSchema;
