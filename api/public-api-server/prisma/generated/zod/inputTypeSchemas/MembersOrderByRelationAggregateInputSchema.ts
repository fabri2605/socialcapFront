import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const MembersOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MembersOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default MembersOrderByRelationAggregateInputSchema;
