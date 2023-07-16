import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MembersCommunityUidPersonUidCompoundUniqueInputSchema } from './MembersCommunityUidPersonUidCompoundUniqueInputSchema';
import { MembersWhereInputSchema } from './MembersWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { CommunityRelationFilterSchema } from './CommunityRelationFilterSchema';
import { CommunityWhereInputSchema } from './CommunityWhereInputSchema';
import { PersonRelationFilterSchema } from './PersonRelationFilterSchema';
import { PersonWhereInputSchema } from './PersonWhereInputSchema';

export const MembersWhereUniqueInputSchema: z.ZodType<Prisma.MembersWhereUniqueInput> = z.object({
  communityUid_personUid: z.lazy(() => MembersCommunityUidPersonUidCompoundUniqueInputSchema)
})
.and(z.object({
  communityUid_personUid: z.lazy(() => MembersCommunityUidPersonUidCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => MembersWhereInputSchema),z.lazy(() => MembersWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MembersWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MembersWhereInputSchema),z.lazy(() => MembersWhereInputSchema).array() ]).optional(),
  communityUid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  personUid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdUtc: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  approvedUtc: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  community: z.union([ z.lazy(() => CommunityRelationFilterSchema),z.lazy(() => CommunityWhereInputSchema) ]).optional(),
  person: z.union([ z.lazy(() => PersonRelationFilterSchema),z.lazy(() => PersonWhereInputSchema) ]).optional(),
}).strict());

export default MembersWhereUniqueInputSchema;
