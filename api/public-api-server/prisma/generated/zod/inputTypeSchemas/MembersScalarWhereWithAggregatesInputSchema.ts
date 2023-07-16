import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';
import { DateTimeNullableWithAggregatesFilterSchema } from './DateTimeNullableWithAggregatesFilterSchema';

export const MembersScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MembersScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MembersScalarWhereWithAggregatesInputSchema),z.lazy(() => MembersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MembersScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MembersScalarWhereWithAggregatesInputSchema),z.lazy(() => MembersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  communityUid: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  personUid: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdUtc: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  approvedUtc: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export default MembersScalarWhereWithAggregatesInputSchema;
