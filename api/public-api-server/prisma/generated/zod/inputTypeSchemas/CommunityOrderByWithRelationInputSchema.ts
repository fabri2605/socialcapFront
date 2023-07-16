import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { MembersOrderByRelationAggregateInputSchema } from './MembersOrderByRelationAggregateInputSchema';

export const CommunityOrderByWithRelationInputSchema: z.ZodType<Prisma.CommunityOrderByWithRelationInput> = z.object({
  uid: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  adminUid: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdUtc: z.lazy(() => SortOrderSchema).optional(),
  updatedUtc: z.lazy(() => SortOrderSchema).optional(),
  approvedUtc: z.lazy(() => SortOrderSchema).optional(),
  Members: z.lazy(() => MembersOrderByRelationAggregateInputSchema).optional()
}).strict();

export default CommunityOrderByWithRelationInputSchema;
