import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MerkleMapLeafSelectSchema } from '../inputTypeSchemas/MerkleMapLeafSelectSchema';
import { MerkleMapLeafIncludeSchema } from '../inputTypeSchemas/MerkleMapLeafIncludeSchema';

export const MerkleMapLeafArgsSchema: z.ZodType<Prisma.MerkleMapLeafArgs> = z.object({
  select: z.lazy(() => MerkleMapLeafSelectSchema).optional(),
  include: z.lazy(() => MerkleMapLeafIncludeSchema).optional(),
}).strict();

export default MerkleMapLeafArgsSchema;
