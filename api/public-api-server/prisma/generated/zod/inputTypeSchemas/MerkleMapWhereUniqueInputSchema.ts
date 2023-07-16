import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MerkleMapWhereInputSchema } from './MerkleMapWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { BigIntFilterSchema } from './BigIntFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { MerkleMapLeafListRelationFilterSchema } from './MerkleMapLeafListRelationFilterSchema';

export const MerkleMapWhereUniqueInputSchema: z.ZodType<Prisma.MerkleMapWhereUniqueInput> = z.object({
  id: z.number()
})
.and(z.object({
  id: z.number().optional(),
  AND: z.union([ z.lazy(() => MerkleMapWhereInputSchema),z.lazy(() => MerkleMapWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MerkleMapWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MerkleMapWhereInputSchema),z.lazy(() => MerkleMapWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  root: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  size: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  height: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdUtc: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedUtc: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  leafs: z.lazy(() => MerkleMapLeafListRelationFilterSchema).optional()
}).strict());

export default MerkleMapWhereUniqueInputSchema;
