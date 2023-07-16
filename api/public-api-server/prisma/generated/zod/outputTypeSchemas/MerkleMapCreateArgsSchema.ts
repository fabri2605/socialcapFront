import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MerkleMapIncludeSchema } from '../inputTypeSchemas/MerkleMapIncludeSchema'
import { MerkleMapCreateInputSchema } from '../inputTypeSchemas/MerkleMapCreateInputSchema'
import { MerkleMapUncheckedCreateInputSchema } from '../inputTypeSchemas/MerkleMapUncheckedCreateInputSchema'
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

export const MerkleMapCreateArgsSchema: z.ZodType<Prisma.MerkleMapCreateArgs> = z.object({
  select: MerkleMapSelectSchema.optional(),
  include: MerkleMapIncludeSchema.optional(),
  data: z.union([ MerkleMapCreateInputSchema,MerkleMapUncheckedCreateInputSchema ]),
}).strict()

export default MerkleMapCreateArgsSchema;
