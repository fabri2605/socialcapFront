import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { IntFilterSchema } from './IntFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { BigIntFilterSchema } from './BigIntFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { MerkleMapLeafListRelationFilterSchema } from './MerkleMapLeafListRelationFilterSchema';

export const MerkleMapWhereInputSchema: z.ZodType<Prisma.MerkleMapWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MerkleMapWhereInputSchema),z.lazy(() => MerkleMapWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MerkleMapWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MerkleMapWhereInputSchema),z.lazy(() => MerkleMapWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  root: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  size: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  height: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdUtc: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedUtc: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  leafs: z.lazy(() => MerkleMapLeafListRelationFilterSchema).optional()
}).strict();

export default MerkleMapWhereInputSchema;
