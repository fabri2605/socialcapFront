import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const MerkleMapCreateManyInputSchema: z.ZodType<Prisma.MerkleMapCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  root: z.bigint(),
  size: z.number().int(),
  height: z.number().int(),
  createdUtc: z.coerce.date().optional(),
  updatedUtc: z.coerce.date().optional()
}).strict();

export default MerkleMapCreateManyInputSchema;
