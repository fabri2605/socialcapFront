import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MembersWhereInputSchema } from '../inputTypeSchemas/MembersWhereInputSchema'
import { MembersOrderByWithAggregationInputSchema } from '../inputTypeSchemas/MembersOrderByWithAggregationInputSchema'
import { MembersScalarFieldEnumSchema } from '../inputTypeSchemas/MembersScalarFieldEnumSchema'
import { MembersScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/MembersScalarWhereWithAggregatesInputSchema'

export const MembersGroupByArgsSchema: z.ZodType<Prisma.MembersGroupByArgs> = z.object({
  where: MembersWhereInputSchema.optional(),
  orderBy: z.union([ MembersOrderByWithAggregationInputSchema.array(),MembersOrderByWithAggregationInputSchema ]).optional(),
  by: MembersScalarFieldEnumSchema.array(),
  having: MembersScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default MembersGroupByArgsSchema;
