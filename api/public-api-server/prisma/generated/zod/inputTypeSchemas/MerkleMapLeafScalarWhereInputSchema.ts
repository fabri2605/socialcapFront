import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { BigIntFilterSchema } from './BigIntFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';

export const MerkleMapLeafScalarWhereInputSchema: z.ZodType<Prisma.MerkleMapLeafScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MerkleMapLeafScalarWhereInputSchema),z.lazy(() => MerkleMapLeafScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MerkleMapLeafScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MerkleMapLeafScalarWhereInputSchema),z.lazy(() => MerkleMapLeafScalarWhereInputSchema).array() ]).optional(),
  uid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  mapId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  index: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  key: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hash: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  data: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdUtc: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedUtc: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export default MerkleMapLeafScalarWhereInputSchema;
