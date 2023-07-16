import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { CommunityWhereInputSchema } from './CommunityWhereInputSchema';

export const CommunityRelationFilterSchema: z.ZodType<Prisma.CommunityRelationFilter> = z.object({
  is: z.lazy(() => CommunityWhereInputSchema).optional(),
  isNot: z.lazy(() => CommunityWhereInputSchema).optional()
}).strict();

export default CommunityRelationFilterSchema;
