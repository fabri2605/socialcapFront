import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MembersWhereInputSchema } from '../inputTypeSchemas/MembersWhereInputSchema'
import { MembersOrderByWithRelationInputSchema } from '../inputTypeSchemas/MembersOrderByWithRelationInputSchema'
import { MembersWhereUniqueInputSchema } from '../inputTypeSchemas/MembersWhereUniqueInputSchema'

export const MembersAggregateArgsSchema: z.ZodType<Prisma.MembersAggregateArgs> = z.object({
  where: MembersWhereInputSchema.optional(),
  orderBy: z.union([ MembersOrderByWithRelationInputSchema.array(),MembersOrderByWithRelationInputSchema ]).optional(),
  cursor: MembersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default MembersAggregateArgsSchema;
