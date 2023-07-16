import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const CommunityCountOutputTypeSelectSchema: z.ZodType<Prisma.CommunityCountOutputTypeSelect> = z.object({
  Members: z.boolean().optional(),
}).strict();

export default CommunityCountOutputTypeSelectSchema;
