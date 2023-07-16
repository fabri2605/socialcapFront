import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MerkleMapWhereInputSchema } from './MerkleMapWhereInputSchema';

export const MerkleMapRelationFilterSchema: z.ZodType<Prisma.MerkleMapRelationFilter> = z.object({
  is: z.lazy(() => MerkleMapWhereInputSchema).optional(),
  isNot: z.lazy(() => MerkleMapWhereInputSchema).optional()
}).strict();

export default MerkleMapRelationFilterSchema;
