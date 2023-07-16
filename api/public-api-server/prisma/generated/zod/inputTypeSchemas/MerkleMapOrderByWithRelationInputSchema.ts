import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { MerkleMapLeafOrderByRelationAggregateInputSchema } from './MerkleMapLeafOrderByRelationAggregateInputSchema';

export const MerkleMapOrderByWithRelationInputSchema: z.ZodType<Prisma.MerkleMapOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  root: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  height: z.lazy(() => SortOrderSchema).optional(),
  createdUtc: z.lazy(() => SortOrderSchema).optional(),
  updatedUtc: z.lazy(() => SortOrderSchema).optional(),
  leafs: z.lazy(() => MerkleMapLeafOrderByRelationAggregateInputSchema).optional()
}).strict();

export default MerkleMapOrderByWithRelationInputSchema;
