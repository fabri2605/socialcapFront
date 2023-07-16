import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { CommunityOrderByWithRelationInputSchema } from './CommunityOrderByWithRelationInputSchema';
import { PersonOrderByWithRelationInputSchema } from './PersonOrderByWithRelationInputSchema';

export const MembersOrderByWithRelationInputSchema: z.ZodType<Prisma.MembersOrderByWithRelationInput> = z.object({
  communityUid: z.lazy(() => SortOrderSchema).optional(),
  personUid: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdUtc: z.lazy(() => SortOrderSchema).optional(),
  approvedUtc: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  community: z.lazy(() => CommunityOrderByWithRelationInputSchema).optional(),
  person: z.lazy(() => PersonOrderByWithRelationInputSchema).optional()
}).strict();

export default MembersOrderByWithRelationInputSchema;
