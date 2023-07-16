import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MerkleMapArgsSchema } from "../outputTypeSchemas/MerkleMapArgsSchema"

export const MerkleMapLeafSelectSchema: z.ZodType<Prisma.MerkleMapLeafSelect> = z.object({
  uid: z.boolean().optional(),
  mapId: z.boolean().optional(),
  index: z.boolean().optional(),
  key: z.boolean().optional(),
  hash: z.boolean().optional(),
  data: z.boolean().optional(),
  createdUtc: z.boolean().optional(),
  updatedUtc: z.boolean().optional(),
  map: z.union([z.boolean(),z.lazy(() => MerkleMapArgsSchema)]).optional(),
}).strict()

export default MerkleMapLeafSelectSchema;
