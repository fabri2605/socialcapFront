import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MerkleMapLeafUpdateManyMutationInputSchema } from '../inputTypeSchemas/MerkleMapLeafUpdateManyMutationInputSchema'
import { MerkleMapLeafUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/MerkleMapLeafUncheckedUpdateManyInputSchema'
import { MerkleMapLeafWhereInputSchema } from '../inputTypeSchemas/MerkleMapLeafWhereInputSchema'

export const MerkleMapLeafUpdateManyArgsSchema: z.ZodType<Prisma.MerkleMapLeafUpdateManyArgs> = z.object({
  data: z.union([ MerkleMapLeafUpdateManyMutationInputSchema,MerkleMapLeafUncheckedUpdateManyInputSchema ]),
  where: MerkleMapLeafWhereInputSchema.optional(),
}).strict()

export default MerkleMapLeafUpdateManyArgsSchema;
