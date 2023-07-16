import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { MerkleMapOrderByWithRelationInputSchema } from './MerkleMapOrderByWithRelationInputSchema';

export const MerkleMapLeafOrderByWithRelationInputSchema: z.ZodType<Prisma.MerkleMapLeafOrderByWithRelationInput> = z.object({
  uid: z.lazy(() => SortOrderSchema).optional(),
  mapId: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  key: z.lazy(() => SortOrderSchema).optional(),
  hash: z.lazy(() => SortOrderSchema).optional(),
  data: z.lazy(() => SortOrderSchema).optional(),
  createdUtc: z.lazy(() => SortOrderSchema).optional(),
  updatedUtc: z.lazy(() => SortOrderSchema).optional(),
  map: z.lazy(() => MerkleMapOrderByWithRelationInputSchema).optional()
}).strict();

export default MerkleMapLeafOrderByWithRelationInputSchema;
