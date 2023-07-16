import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { MembersCountOrderByAggregateInputSchema } from './MembersCountOrderByAggregateInputSchema';
import { MembersMaxOrderByAggregateInputSchema } from './MembersMaxOrderByAggregateInputSchema';
import { MembersMinOrderByAggregateInputSchema } from './MembersMinOrderByAggregateInputSchema';

export const MembersOrderByWithAggregationInputSchema: z.ZodType<Prisma.MembersOrderByWithAggregationInput> = z.object({
  communityUid: z.lazy(() => SortOrderSchema).optional(),
  personUid: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdUtc: z.lazy(() => SortOrderSchema).optional(),
  approvedUtc: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => MembersCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MembersMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MembersMinOrderByAggregateInputSchema).optional()
}).strict();

export default MembersOrderByWithAggregationInputSchema;
