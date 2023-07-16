import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MerkleMapLeafFindManyArgsSchema } from "../outputTypeSchemas/MerkleMapLeafFindManyArgsSchema"
import { MerkleMapCountOutputTypeArgsSchema } from "../outputTypeSchemas/MerkleMapCountOutputTypeArgsSchema"

export const MerkleMapSelectSchema: z.ZodType<Prisma.MerkleMapSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  root: z.boolean().optional(),
  size: z.boolean().optional(),
  height: z.boolean().optional(),
  createdUtc: z.boolean().optional(),
  updatedUtc: z.boolean().optional(),
  leafs: z.union([z.boolean(),z.lazy(() => MerkleMapLeafFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MerkleMapCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default MerkleMapSelectSchema;
