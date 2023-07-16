import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MerkleMapCreateNestedOneWithoutLeafsInputSchema } from './MerkleMapCreateNestedOneWithoutLeafsInputSchema';

export const MerkleMapLeafCreateInputSchema: z.ZodType<Prisma.MerkleMapLeafCreateInput> = z.object({
  uid: z.string().uuid().optional(),
  index: z.bigint(),
  key: z.string(),
  hash: z.string(),
  data: z.string(),
  createdUtc: z.coerce.date().optional(),
  updatedUtc: z.coerce.date().optional(),
  map: z.lazy(() => MerkleMapCreateNestedOneWithoutLeafsInputSchema)
}).strict();

export default MerkleMapLeafCreateInputSchema;
