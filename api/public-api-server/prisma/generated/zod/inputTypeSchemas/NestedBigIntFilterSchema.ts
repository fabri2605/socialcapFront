import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { BigIntFieldRefInputSchema } from './BigIntFieldRefInputSchema';
import { ListBigIntFieldRefInputSchema } from './ListBigIntFieldRefInputSchema';

export const NestedBigIntFilterSchema: z.ZodType<Prisma.NestedBigIntFilter> = z.object({
  equals: z.union([ z.bigint(),z.lazy(() => BigIntFieldRefInputSchema) ]).optional(),
  in: z.union([ z.bigint().array(),z.lazy(() => ListBigIntFieldRefInputSchema) ]).optional(),
  notIn: z.union([ z.bigint().array(),z.lazy(() => ListBigIntFieldRefInputSchema) ]).optional(),
  lt: z.union([ z.bigint(),z.lazy(() => BigIntFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.bigint(),z.lazy(() => BigIntFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.bigint(),z.lazy(() => BigIntFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.bigint(),z.lazy(() => BigIntFieldRefInputSchema) ]).optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntFilterSchema) ]).optional(),
}).strict();

export default NestedBigIntFilterSchema;
