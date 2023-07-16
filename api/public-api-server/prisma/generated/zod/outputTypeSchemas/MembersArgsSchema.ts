import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MembersSelectSchema } from '../inputTypeSchemas/MembersSelectSchema';
import { MembersIncludeSchema } from '../inputTypeSchemas/MembersIncludeSchema';

export const MembersArgsSchema: z.ZodType<Prisma.MembersArgs> = z.object({
  select: z.lazy(() => MembersSelectSchema).optional(),
  include: z.lazy(() => MembersIncludeSchema).optional(),
}).strict();

export default MembersArgsSchema;
