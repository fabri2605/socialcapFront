import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MembersWhereInputSchema } from '../inputTypeSchemas/MembersWhereInputSchema'

export const MembersDeleteManyArgsSchema: z.ZodType<Prisma.MembersDeleteManyArgs> = z.object({
  where: MembersWhereInputSchema.optional(),
}).strict()

export default MembersDeleteManyArgsSchema;
