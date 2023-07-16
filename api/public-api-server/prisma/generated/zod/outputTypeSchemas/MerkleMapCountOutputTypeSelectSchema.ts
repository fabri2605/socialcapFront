import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const MerkleMapCountOutputTypeSelectSchema: z.ZodType<Prisma.MerkleMapCountOutputTypeSelect> = z.object({
  leafs: z.boolean().optional(),
}).strict();

export default MerkleMapCountOutputTypeSelectSchema;
