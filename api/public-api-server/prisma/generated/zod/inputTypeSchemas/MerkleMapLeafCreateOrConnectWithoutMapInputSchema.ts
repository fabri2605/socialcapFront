import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MerkleMapLeafWhereUniqueInputSchema } from './MerkleMapLeafWhereUniqueInputSchema';
import { MerkleMapLeafCreateWithoutMapInputSchema } from './MerkleMapLeafCreateWithoutMapInputSchema';
import { MerkleMapLeafUncheckedCreateWithoutMapInputSchema } from './MerkleMapLeafUncheckedCreateWithoutMapInputSchema';

export const MerkleMapLeafCreateOrConnectWithoutMapInputSchema: z.ZodType<Prisma.MerkleMapLeafCreateOrConnectWithoutMapInput> = z.object({
  where: z.lazy(() => MerkleMapLeafWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MerkleMapLeafCreateWithoutMapInputSchema),z.lazy(() => MerkleMapLeafUncheckedCreateWithoutMapInputSchema) ]),
}).strict();

export default MerkleMapLeafCreateOrConnectWithoutMapInputSchema;
