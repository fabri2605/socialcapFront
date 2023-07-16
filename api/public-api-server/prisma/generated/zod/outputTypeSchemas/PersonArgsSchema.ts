import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonSelectSchema } from '../inputTypeSchemas/PersonSelectSchema';
import { PersonIncludeSchema } from '../inputTypeSchemas/PersonIncludeSchema';

export const PersonArgsSchema: z.ZodType<Prisma.PersonArgs> = z.object({
  select: z.lazy(() => PersonSelectSchema).optional(),
  include: z.lazy(() => PersonIncludeSchema).optional(),
}).strict();

export default PersonArgsSchema;
