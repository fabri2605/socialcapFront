import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MembersCreateManyInputSchema } from '../inputTypeSchemas/MembersCreateManyInputSchema'

export const MembersCreateManyArgsSchema: z.ZodType<Prisma.MembersCreateManyArgs> = z.object({
  data: z.union([ MembersCreateManyInputSchema,MembersCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default MembersCreateManyArgsSchema;
