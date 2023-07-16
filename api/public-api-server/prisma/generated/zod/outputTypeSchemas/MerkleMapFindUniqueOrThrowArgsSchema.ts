import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MerkleMapIncludeSchema } from '../inputTypeSchemas/MerkleMapIncludeSchema'
import { MerkleMapWhereUniqueInputSchema } from '../inputTypeSchemas/MerkleMapWhereUniqueInputSchema'
import { MerkleMapLeafFindManyArgsSchema } from "../outputTypeSchemas/MerkleMapLeafFindManyArgsSchema"
import { MerkleMapCountOutputTypeArgsSchema } from "../outputTypeSchemas/MerkleMapCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

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

export const MerkleMapFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MerkleMapFindUniqueOrThrowArgs> = z.object({
  select: MerkleMapSelectSchema.optional(),
  include: MerkleMapIncludeSchema.optional(),
  where: MerkleMapWhereUniqueInputSchema,
}).strict()

export default MerkleMapFindUniqueOrThrowArgsSchema;
