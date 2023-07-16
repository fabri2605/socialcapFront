import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldRefInputSchema } from './StringFieldRefInputSchema';
import { ListStringFieldRefInputSchema } from './ListStringFieldRefInputSchema';
import { QueryModeSchema } from './QueryModeSchema';
import { NestedStringWithAggregatesFilterSchema } from './NestedStringWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedStringFilterSchema } from './NestedStringFilterSchema';

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  in: z.union([ z.string().array(),z.lazy(() => ListStringFieldRefInputSchema) ]).optional(),
  notIn: z.union([ z.string().array(),z.lazy(() => ListStringFieldRefInputSchema) ]).optional(),
  lt: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  contains: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  startsWith: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  endsWith: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export default StringWithAggregatesFilterSchema;
