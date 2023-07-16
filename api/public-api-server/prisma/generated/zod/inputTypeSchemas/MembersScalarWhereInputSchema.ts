import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';

export const MembersScalarWhereInputSchema: z.ZodType<Prisma.MembersScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MembersScalarWhereInputSchema),z.lazy(() => MembersScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MembersScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MembersScalarWhereInputSchema),z.lazy(() => MembersScalarWhereInputSchema).array() ]).optional(),
  communityUid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  personUid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdUtc: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  approvedUtc: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export default MembersScalarWhereInputSchema;
