import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MerkleMapLeafWhereInputSchema } from '../inputTypeSchemas/MerkleMapLeafWhereInputSchema'
import { MerkleMapLeafOrderByWithAggregationInputSchema } from '../inputTypeSchemas/MerkleMapLeafOrderByWithAggregationInputSchema'
import { MerkleMapLeafScalarFieldEnumSchema } from '../inputTypeSchemas/MerkleMapLeafScalarFieldEnumSchema'
import { MerkleMapLeafScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/MerkleMapLeafScalarWhereWithAggregatesInputSchema'

export const MerkleMapLeafGroupByArgsSchema: z.ZodType<Prisma.MerkleMapLeafGroupByArgs> = z.object({
  where: MerkleMapLeafWhereInputSchema.optional(),
  orderBy: z.union([ MerkleMapLeafOrderByWithAggregationInputSchema.array(),MerkleMapLeafOrderByWithAggregationInputSchema ]).optional(),
  by: MerkleMapLeafScalarFieldEnumSchema.array(),
  having: MerkleMapLeafScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default MerkleMapLeafGroupByArgsSchema;
