import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MembersWhereInputSchema } from './MembersWhereInputSchema';

export const MembersListRelationFilterSchema: z.ZodType<Prisma.MembersListRelationFilter> = z.object({
  every: z.lazy(() => MembersWhereInputSchema).optional(),
  some: z.lazy(() => MembersWhereInputSchema).optional(),
  none: z.lazy(() => MembersWhereInputSchema).optional()
}).strict();

export default MembersListRelationFilterSchema;
