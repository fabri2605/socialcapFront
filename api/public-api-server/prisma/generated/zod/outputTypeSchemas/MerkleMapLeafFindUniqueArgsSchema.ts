import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MerkleMapLeafIncludeSchema } from '../inputTypeSchemas/MerkleMapLeafIncludeSchema'
import { MerkleMapLeafWhereUniqueInputSchema } from '../inputTypeSchemas/MerkleMapLeafWhereUniqueInputSchema'
import { MerkleMapArgsSchema } from "../outputTypeSchemas/MerkleMapArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

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

export const MerkleMapLeafFindUniqueArgsSchema: z.ZodType<Prisma.MerkleMapLeafFindUniqueArgs> = z.object({
  select: MerkleMapLeafSelectSchema.optional(),
  include: MerkleMapLeafIncludeSchema.optional(),
  where: MerkleMapLeafWhereUniqueInputSchema,
}).strict()

export default MerkleMapLeafFindUniqueArgsSchema;
