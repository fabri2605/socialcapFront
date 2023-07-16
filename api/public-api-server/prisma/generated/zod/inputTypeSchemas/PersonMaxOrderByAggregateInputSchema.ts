import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const PersonMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PersonMaxOrderByAggregateInput> = z.object({
  uid: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  fullName: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  telegram: z.lazy(() => SortOrderSchema).optional(),
  preferences: z.lazy(() => SortOrderSchema).optional(),
  createdUTC: z.lazy(() => SortOrderSchema).optional(),
  updatedUTC: z.lazy(() => SortOrderSchema).optional(),
  approvedUTC: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default PersonMaxOrderByAggregateInputSchema;
