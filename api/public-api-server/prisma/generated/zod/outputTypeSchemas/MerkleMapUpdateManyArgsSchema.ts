import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MerkleMapUpdateManyMutationInputSchema } from '../inputTypeSchemas/MerkleMapUpdateManyMutationInputSchema'
import { MerkleMapUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/MerkleMapUncheckedUpdateManyInputSchema'
import { MerkleMapWhereInputSchema } from '../inputTypeSchemas/MerkleMapWhereInputSchema'

export const MerkleMapUpdateManyArgsSchema: z.ZodType<Prisma.MerkleMapUpdateManyArgs> = z.object({
  data: z.union([ MerkleMapUpdateManyMutationInputSchema,MerkleMapUncheckedUpdateManyInputSchema ]),
  where: MerkleMapWhereInputSchema.optional(),
}).strict()

export default MerkleMapUpdateManyArgsSchema;
