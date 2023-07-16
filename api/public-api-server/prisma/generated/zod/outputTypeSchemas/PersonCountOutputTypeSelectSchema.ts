import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const PersonCountOutputTypeSelectSchema: z.ZodType<Prisma.PersonCountOutputTypeSelect> = z.object({
  Members: z.boolean().optional(),
}).strict();

export default PersonCountOutputTypeSelectSchema;
