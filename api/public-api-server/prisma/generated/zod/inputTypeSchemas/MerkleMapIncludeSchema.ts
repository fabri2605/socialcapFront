import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MerkleMapLeafFindManyArgsSchema } from "../outputTypeSchemas/MerkleMapLeafFindManyArgsSchema"
import { MerkleMapCountOutputTypeArgsSchema } from "../outputTypeSchemas/MerkleMapCountOutputTypeArgsSchema"

export const MerkleMapIncludeSchema: z.ZodType<Prisma.MerkleMapInclude> = z.object({
  leafs: z.union([z.boolean(),z.lazy(() => MerkleMapLeafFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MerkleMapCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default MerkleMapIncludeSchema;
