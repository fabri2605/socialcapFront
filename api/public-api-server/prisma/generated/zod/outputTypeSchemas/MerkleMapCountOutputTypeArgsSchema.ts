import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MerkleMapCountOutputTypeSelectSchema } from './MerkleMapCountOutputTypeSelectSchema';

export const MerkleMapCountOutputTypeArgsSchema: z.ZodType<Prisma.MerkleMapCountOutputTypeArgs> = z.object({
  select: z.lazy(() => MerkleMapCountOutputTypeSelectSchema).nullish(),
}).strict();

export default MerkleMapCountOutputTypeSelectSchema;
