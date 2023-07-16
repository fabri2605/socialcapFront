import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';
import { BigIntWithAggregatesFilterSchema } from './BigIntWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';

export const MerkleMapLeafScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MerkleMapLeafScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MerkleMapLeafScalarWhereWithAggregatesInputSchema),z.lazy(() => MerkleMapLeafScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MerkleMapLeafScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MerkleMapLeafScalarWhereWithAggregatesInputSchema),z.lazy(() => MerkleMapLeafScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  uid: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  mapId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  index: z.union([ z.lazy(() => BigIntWithAggregatesFilterSchema),z.bigint() ]).optional(),
  key: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  hash: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  data: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdUtc: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedUtc: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export default MerkleMapLeafScalarWhereWithAggregatesInputSchema;
