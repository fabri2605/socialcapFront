import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { BigIntFieldRefInputSchema } from './BigIntFieldRefInputSchema';
import { ListBigIntFieldRefInputSchema } from './ListBigIntFieldRefInputSchema';
import { NestedBigIntWithAggregatesFilterSchema } from './NestedBigIntWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedFloatFilterSchema } from './NestedFloatFilterSchema';
import { NestedBigIntFilterSchema } from './NestedBigIntFilterSchema';

export const BigIntWithAggregatesFilterSchema: z.ZodType<Prisma.BigIntWithAggregatesFilter> = z.object({
  equals: z.union([ z.bigint(),z.lazy(() => BigIntFieldRefInputSchema) ]).optional(),
  in: z.union([ z.bigint().array(),z.lazy(() => ListBigIntFieldRefInputSchema) ]).optional(),
  notIn: z.union([ z.bigint().array(),z.lazy(() => ListBigIntFieldRefInputSchema) ]).optional(),
  lt: z.union([ z.bigint(),z.lazy(() => BigIntFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.bigint(),z.lazy(() => BigIntFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.bigint(),z.lazy(() => BigIntFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.bigint(),z.lazy(() => BigIntFieldRefInputSchema) ]).optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedBigIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBigIntFilterSchema).optional(),
  _max: z.lazy(() => NestedBigIntFilterSchema).optional()
}).strict();

export default BigIntWithAggregatesFilterSchema;
