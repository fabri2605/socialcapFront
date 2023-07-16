import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MerkleMapLeafCreateNestedManyWithoutMapInputSchema } from './MerkleMapLeafCreateNestedManyWithoutMapInputSchema';

export const MerkleMapCreateInputSchema: z.ZodType<Prisma.MerkleMapCreateInput> = z.object({
  name: z.string(),
  root: z.bigint(),
  size: z.number().int(),
  height: z.number().int(),
  createdUtc: z.coerce.date().optional(),
  updatedUtc: z.coerce.date().optional(),
  leafs: z.lazy(() => MerkleMapLeafCreateNestedManyWithoutMapInputSchema).optional()
}).strict();

export default MerkleMapCreateInputSchema;
