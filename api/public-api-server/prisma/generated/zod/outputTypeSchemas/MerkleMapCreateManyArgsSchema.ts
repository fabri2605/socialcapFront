import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MerkleMapCreateManyInputSchema } from '../inputTypeSchemas/MerkleMapCreateManyInputSchema'

export const MerkleMapCreateManyArgsSchema: z.ZodType<Prisma.MerkleMapCreateManyArgs> = z.object({
  data: z.union([ MerkleMapCreateManyInputSchema,MerkleMapCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default MerkleMapCreateManyArgsSchema;
