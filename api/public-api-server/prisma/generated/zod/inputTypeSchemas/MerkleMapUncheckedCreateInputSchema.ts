import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MerkleMapLeafUncheckedCreateNestedManyWithoutMapInputSchema } from './MerkleMapLeafUncheckedCreateNestedManyWithoutMapInputSchema';

export const MerkleMapUncheckedCreateInputSchema: z.ZodType<Prisma.MerkleMapUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  root: z.bigint(),
  size: z.number().int(),
  height: z.number().int(),
  createdUtc: z.coerce.date().optional(),
  updatedUtc: z.coerce.date().optional(),
  leafs: z.lazy(() => MerkleMapLeafUncheckedCreateNestedManyWithoutMapInputSchema).optional()
}).strict();

export default MerkleMapUncheckedCreateInputSchema;
