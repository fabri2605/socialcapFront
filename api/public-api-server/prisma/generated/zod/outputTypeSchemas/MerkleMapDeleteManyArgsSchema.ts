import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MerkleMapWhereInputSchema } from '../inputTypeSchemas/MerkleMapWhereInputSchema'

export const MerkleMapDeleteManyArgsSchema: z.ZodType<Prisma.MerkleMapDeleteManyArgs> = z.object({
  where: MerkleMapWhereInputSchema.optional(),
}).strict()

export default MerkleMapDeleteManyArgsSchema;
