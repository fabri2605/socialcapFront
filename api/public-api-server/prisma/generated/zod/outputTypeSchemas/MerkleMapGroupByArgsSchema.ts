import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MerkleMapWhereInputSchema } from '../inputTypeSchemas/MerkleMapWhereInputSchema'
import { MerkleMapOrderByWithAggregationInputSchema } from '../inputTypeSchemas/MerkleMapOrderByWithAggregationInputSchema'
import { MerkleMapScalarFieldEnumSchema } from '../inputTypeSchemas/MerkleMapScalarFieldEnumSchema'
import { MerkleMapScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/MerkleMapScalarWhereWithAggregatesInputSchema'

export const MerkleMapGroupByArgsSchema: z.ZodType<Prisma.MerkleMapGroupByArgs> = z.object({
  where: MerkleMapWhereInputSchema.optional(),
  orderBy: z.union([ MerkleMapOrderByWithAggregationInputSchema.array(),MerkleMapOrderByWithAggregationInputSchema ]).optional(),
  by: MerkleMapScalarFieldEnumSchema.array(),
  having: MerkleMapScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default MerkleMapGroupByArgsSchema;
