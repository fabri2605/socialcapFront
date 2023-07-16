import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { MerkleMapCountOrderByAggregateInputSchema } from './MerkleMapCountOrderByAggregateInputSchema';
import { MerkleMapAvgOrderByAggregateInputSchema } from './MerkleMapAvgOrderByAggregateInputSchema';
import { MerkleMapMaxOrderByAggregateInputSchema } from './MerkleMapMaxOrderByAggregateInputSchema';
import { MerkleMapMinOrderByAggregateInputSchema } from './MerkleMapMinOrderByAggregateInputSchema';
import { MerkleMapSumOrderByAggregateInputSchema } from './MerkleMapSumOrderByAggregateInputSchema';

export const MerkleMapOrderByWithAggregationInputSchema: z.ZodType<Prisma.MerkleMapOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  root: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  height: z.lazy(() => SortOrderSchema).optional(),
  createdUtc: z.lazy(() => SortOrderSchema).optional(),
  updatedUtc: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MerkleMapCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => MerkleMapAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MerkleMapMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MerkleMapMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => MerkleMapSumOrderByAggregateInputSchema).optional()
}).strict();

export default MerkleMapOrderByWithAggregationInputSchema;
