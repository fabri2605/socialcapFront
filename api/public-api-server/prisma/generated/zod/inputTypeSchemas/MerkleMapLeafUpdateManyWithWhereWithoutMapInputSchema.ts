import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MerkleMapLeafScalarWhereInputSchema } from './MerkleMapLeafScalarWhereInputSchema';
import { MerkleMapLeafUpdateManyMutationInputSchema } from './MerkleMapLeafUpdateManyMutationInputSchema';
import { MerkleMapLeafUncheckedUpdateManyWithoutMapInputSchema } from './MerkleMapLeafUncheckedUpdateManyWithoutMapInputSchema';

export const MerkleMapLeafUpdateManyWithWhereWithoutMapInputSchema: z.ZodType<Prisma.MerkleMapLeafUpdateManyWithWhereWithoutMapInput> = z.object({
  where: z.lazy(() => MerkleMapLeafScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MerkleMapLeafUpdateManyMutationInputSchema),z.lazy(() => MerkleMapLeafUncheckedUpdateManyWithoutMapInputSchema) ]),
}).strict();

export default MerkleMapLeafUpdateManyWithWhereWithoutMapInputSchema;
