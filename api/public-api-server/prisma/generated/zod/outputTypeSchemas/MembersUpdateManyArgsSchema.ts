import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MembersUpdateManyMutationInputSchema } from '../inputTypeSchemas/MembersUpdateManyMutationInputSchema'
import { MembersUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/MembersUncheckedUpdateManyInputSchema'
import { MembersWhereInputSchema } from '../inputTypeSchemas/MembersWhereInputSchema'

export const MembersUpdateManyArgsSchema: z.ZodType<Prisma.MembersUpdateManyArgs> = z.object({
  data: z.union([ MembersUpdateManyMutationInputSchema,MembersUncheckedUpdateManyInputSchema ]),
  where: MembersWhereInputSchema.optional(),
}).strict()

export default MembersUpdateManyArgsSchema;
