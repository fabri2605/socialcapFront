import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MerkleMapLeafWhereInputSchema } from '../inputTypeSchemas/MerkleMapLeafWhereInputSchema'

export const MerkleMapLeafDeleteManyArgsSchema: z.ZodType<Prisma.MerkleMapLeafDeleteManyArgs> = z.object({
  where: MerkleMapLeafWhereInputSchema.optional(),
}).strict()

export default MerkleMapLeafDeleteManyArgsSchema;
