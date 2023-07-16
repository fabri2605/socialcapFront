import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MerkleMapLeafCreateManyInputSchema } from '../inputTypeSchemas/MerkleMapLeafCreateManyInputSchema'

export const MerkleMapLeafCreateManyArgsSchema: z.ZodType<Prisma.MerkleMapLeafCreateManyArgs> = z.object({
  data: z.union([ MerkleMapLeafCreateManyInputSchema,MerkleMapLeafCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default MerkleMapLeafCreateManyArgsSchema;
