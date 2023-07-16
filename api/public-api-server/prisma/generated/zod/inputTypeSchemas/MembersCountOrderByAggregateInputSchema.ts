import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const MembersCountOrderByAggregateInputSchema: z.ZodType<Prisma.MembersCountOrderByAggregateInput> = z.object({
  communityUid: z.lazy(() => SortOrderSchema).optional(),
  personUid: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdUtc: z.lazy(() => SortOrderSchema).optional(),
  approvedUtc: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default MembersCountOrderByAggregateInputSchema;
