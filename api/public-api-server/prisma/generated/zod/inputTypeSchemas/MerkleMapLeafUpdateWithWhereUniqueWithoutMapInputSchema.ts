import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MerkleMapLeafWhereUniqueInputSchema } from './MerkleMapLeafWhereUniqueInputSchema';
import { MerkleMapLeafUpdateWithoutMapInputSchema } from './MerkleMapLeafUpdateWithoutMapInputSchema';
import { MerkleMapLeafUncheckedUpdateWithoutMapInputSchema } from './MerkleMapLeafUncheckedUpdateWithoutMapInputSchema';

export const MerkleMapLeafUpdateWithWhereUniqueWithoutMapInputSchema: z.ZodType<Prisma.MerkleMapLeafUpdateWithWhereUniqueWithoutMapInput> = z.object({
  where: z.lazy(() => MerkleMapLeafWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MerkleMapLeafUpdateWithoutMapInputSchema),z.lazy(() => MerkleMapLeafUncheckedUpdateWithoutMapInputSchema) ]),
}).strict();

export default MerkleMapLeafUpdateWithWhereUniqueWithoutMapInputSchema;
