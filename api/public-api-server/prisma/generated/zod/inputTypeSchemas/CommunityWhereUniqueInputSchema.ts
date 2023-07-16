import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { CommunityWhereInputSchema } from './CommunityWhereInputSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { MembersListRelationFilterSchema } from './MembersListRelationFilterSchema';

export const CommunityWhereUniqueInputSchema: z.ZodType<Prisma.CommunityWhereUniqueInput> = z.union([
  z.object({
    uid: z.string(),
    uid: z.string()
  }),
  z.object({
    uid: z.string(),
  }),
  z.object({
    uid: z.string(),
  }),
])
.and(z.object({
  uid: z.string().optional(),
  AND: z.union([ z.lazy(() => CommunityWhereInputSchema),z.lazy(() => CommunityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommunityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommunityWhereInputSchema),z.lazy(() => CommunityWhereInputSchema).array() ]).optional(),
  accountId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  adminUid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  state: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdUtc: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedUtc: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  approvedUtc: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Members: z.lazy(() => MembersListRelationFilterSchema).optional()
}).strict());

export default CommunityWhereUniqueInputSchema;
