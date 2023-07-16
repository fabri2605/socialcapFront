import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { MerkleMapLeafCountOrderByAggregateInputSchema } from './MerkleMapLeafCountOrderByAggregateInputSchema';
import { MerkleMapLeafAvgOrderByAggregateInputSchema } from './MerkleMapLeafAvgOrderByAggregateInputSchema';
import { MerkleMapLeafMaxOrderByAggregateInputSchema } from './MerkleMapLeafMaxOrderByAggregateInputSchema';
import { MerkleMapLeafMinOrderByAggregateInputSchema } from './MerkleMapLeafMinOrderByAggregateInputSchema';
import { MerkleMapLeafSumOrderByAggregateInputSchema } from './MerkleMapLeafSumOrderByAggregateInputSchema';

export const MerkleMapLeafOrderByWithAggregationInputSchema: z.ZodType<Prisma.MerkleMapLeafOrderByWithAggregationInput> = z.object({
  uid: z.lazy(() => SortOrderSchema).optional(),
  mapId: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  key: z.lazy(() => SortOrderSchema).optional(),
  hash: z.lazy(() => SortOrderSchema).optional(),
  data: z.lazy(() => SortOrderSchema).optional(),
  createdUtc: z.lazy(() => SortOrderSchema).optional(),
  updatedUtc: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MerkleMapLeafCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => MerkleMapLeafAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MerkleMapLeafMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MerkleMapLeafMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => MerkleMapLeafSumOrderByAggregateInputSchema).optional()
}).strict();

export default MerkleMapLeafOrderByWithAggregationInputSchema;
