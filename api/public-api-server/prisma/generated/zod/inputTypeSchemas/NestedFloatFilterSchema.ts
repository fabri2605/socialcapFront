import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { FloatFieldRefInputSchema } from './FloatFieldRefInputSchema';
import { ListFloatFieldRefInputSchema } from './ListFloatFieldRefInputSchema';

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  in: z.union([ z.number().array(),z.lazy(() => ListFloatFieldRefInputSchema) ]).optional(),
  notIn: z.union([ z.number().array(),z.lazy(() => ListFloatFieldRefInputSchema) ]).optional(),
  lt: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export default NestedFloatFilterSchema;
