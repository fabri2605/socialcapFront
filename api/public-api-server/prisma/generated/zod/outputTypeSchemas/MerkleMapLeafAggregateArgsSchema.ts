import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MerkleMapLeafWhereInputSchema } from '../inputTypeSchemas/MerkleMapLeafWhereInputSchema'
import { MerkleMapLeafOrderByWithRelationInputSchema } from '../inputTypeSchemas/MerkleMapLeafOrderByWithRelationInputSchema'
import { MerkleMapLeafWhereUniqueInputSchema } from '../inputTypeSchemas/MerkleMapLeafWhereUniqueInputSchema'

export const MerkleMapLeafAggregateArgsSchema: z.ZodType<Prisma.MerkleMapLeafAggregateArgs> = z.object({
  where: MerkleMapLeafWhereInputSchema.optional(),
  orderBy: z.union([ MerkleMapLeafOrderByWithRelationInputSchema.array(),MerkleMapLeafOrderByWithRelationInputSchema ]).optional(),
  cursor: MerkleMapLeafWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default MerkleMapLeafAggregateArgsSchema;
