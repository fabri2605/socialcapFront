import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MerkleMapLeafWhereInputSchema } from './MerkleMapLeafWhereInputSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { BigIntFilterSchema } from './BigIntFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { MerkleMapRelationFilterSchema } from './MerkleMapRelationFilterSchema';
import { MerkleMapWhereInputSchema } from './MerkleMapWhereInputSchema';

export const MerkleMapLeafWhereUniqueInputSchema: z.ZodType<Prisma.MerkleMapLeafWhereUniqueInput> = z.object({
  uid: z.string()
})
.and(z.object({
  uid: z.string().optional(),
  AND: z.union([ z.lazy(() => MerkleMapLeafWhereInputSchema),z.lazy(() => MerkleMapLeafWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MerkleMapLeafWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MerkleMapLeafWhereInputSchema),z.lazy(() => MerkleMapLeafWhereInputSchema).array() ]).optional(),
  mapId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  index: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  key: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hash: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  data: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdUtc: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedUtc: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  map: z.union([ z.lazy(() => MerkleMapRelationFilterSchema),z.lazy(() => MerkleMapWhereInputSchema) ]).optional(),
}).strict());

export default MerkleMapLeafWhereUniqueInputSchema;
