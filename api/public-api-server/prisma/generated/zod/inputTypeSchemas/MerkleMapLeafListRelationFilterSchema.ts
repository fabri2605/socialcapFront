import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MerkleMapLeafWhereInputSchema } from './MerkleMapLeafWhereInputSchema';

export const MerkleMapLeafListRelationFilterSchema: z.ZodType<Prisma.MerkleMapLeafListRelationFilter> = z.object({
  every: z.lazy(() => MerkleMapLeafWhereInputSchema).optional(),
  some: z.lazy(() => MerkleMapLeafWhereInputSchema).optional(),
  none: z.lazy(() => MerkleMapLeafWhereInputSchema).optional()
}).strict();

export default MerkleMapLeafListRelationFilterSchema;
