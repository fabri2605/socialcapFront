import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { DateTimeFieldRefInputSchema } from './DateTimeFieldRefInputSchema';
import { ListDateTimeFieldRefInputSchema } from './ListDateTimeFieldRefInputSchema';
import { NestedDateTimeNullableFilterSchema } from './NestedDateTimeNullableFilterSchema';

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional().nullable(),
  in: z.union([ z.coerce.date().array(),z.lazy(() => ListDateTimeFieldRefInputSchema) ]).optional().nullable(),
  notIn: z.union([ z.coerce.date().array(),z.lazy(() => ListDateTimeFieldRefInputSchema) ]).optional().nullable(),
  lt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export default DateTimeNullableFilterSchema;
