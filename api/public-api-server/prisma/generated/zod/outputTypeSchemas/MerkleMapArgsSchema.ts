import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MerkleMapSelectSchema } from '../inputTypeSchemas/MerkleMapSelectSchema';
import { MerkleMapIncludeSchema } from '../inputTypeSchemas/MerkleMapIncludeSchema';

export const MerkleMapArgsSchema: z.ZodType<Prisma.MerkleMapArgs> = z.object({
  select: z.lazy(() => MerkleMapSelectSchema).optional(),
  include: z.lazy(() => MerkleMapIncludeSchema).optional(),
}).strict();

export default MerkleMapArgsSchema;
