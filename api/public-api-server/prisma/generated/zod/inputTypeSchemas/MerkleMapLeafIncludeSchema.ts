import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MerkleMapArgsSchema } from "../outputTypeSchemas/MerkleMapArgsSchema"

export const MerkleMapLeafIncludeSchema: z.ZodType<Prisma.MerkleMapLeafInclude> = z.object({
  map: z.union([z.boolean(),z.lazy(() => MerkleMapArgsSchema)]).optional(),
}).strict()

export default MerkleMapLeafIncludeSchema;
