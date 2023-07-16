import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const MerkleMapLeafUncheckedCreateWithoutMapInputSchema: z.ZodType<Prisma.MerkleMapLeafUncheckedCreateWithoutMapInput> = z.object({
  uid: z.string().uuid().optional(),
  index: z.bigint(),
  key: z.string(),
  hash: z.string(),
  data: z.string(),
  createdUtc: z.coerce.date().optional(),
  updatedUtc: z.coerce.date().optional()
}).strict();

export default MerkleMapLeafUncheckedCreateWithoutMapInputSchema;
