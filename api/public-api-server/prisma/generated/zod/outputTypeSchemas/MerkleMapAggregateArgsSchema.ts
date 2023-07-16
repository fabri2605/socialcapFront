import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MerkleMapWhereInputSchema } from '../inputTypeSchemas/MerkleMapWhereInputSchema'
import { MerkleMapOrderByWithRelationInputSchema } from '../inputTypeSchemas/MerkleMapOrderByWithRelationInputSchema'
import { MerkleMapWhereUniqueInputSchema } from '../inputTypeSchemas/MerkleMapWhereUniqueInputSchema'

export const MerkleMapAggregateArgsSchema: z.ZodType<Prisma.MerkleMapAggregateArgs> = z.object({
  where: MerkleMapWhereInputSchema.optional(),
  orderBy: z.union([ MerkleMapOrderByWithRelationInputSchema.array(),MerkleMapOrderByWithRelationInputSchema ]).optional(),
  cursor: MerkleMapWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default MerkleMapAggregateArgsSchema;
