import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const MerkleMapLeafCreateManyInputSchema: z.ZodType<Prisma.MerkleMapLeafCreateManyInput> = z.object({
  uid: z.string().uuid().optional(),
  mapId: z.number().int(),
  index: z.bigint(),
  key: z.string(),
  hash: z.string(),
  data: z.string(),
  createdUtc: z.coerce.date().optional(),
  updatedUtc: z.coerce.date().optional()
}).strict();

export default MerkleMapLeafCreateManyInputSchema;
