import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const MerkleMapCreateWithoutLeafsInputSchema: z.ZodType<Prisma.MerkleMapCreateWithoutLeafsInput> = z.object({
  name: z.string(),
  root: z.bigint(),
  size: z.number().int(),
  height: z.number().int(),
  createdUtc: z.coerce.date().optional(),
  updatedUtc: z.coerce.date().optional()
}).strict();

export default MerkleMapCreateWithoutLeafsInputSchema;
