import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MerkleMapLeafWhereUniqueInputSchema } from './MerkleMapLeafWhereUniqueInputSchema';
import { MerkleMapLeafUpdateWithoutMapInputSchema } from './MerkleMapLeafUpdateWithoutMapInputSchema';
import { MerkleMapLeafUncheckedUpdateWithoutMapInputSchema } from './MerkleMapLeafUncheckedUpdateWithoutMapInputSchema';
import { MerkleMapLeafCreateWithoutMapInputSchema } from './MerkleMapLeafCreateWithoutMapInputSchema';
import { MerkleMapLeafUncheckedCreateWithoutMapInputSchema } from './MerkleMapLeafUncheckedCreateWithoutMapInputSchema';

export const MerkleMapLeafUpsertWithWhereUniqueWithoutMapInputSchema: z.ZodType<Prisma.MerkleMapLeafUpsertWithWhereUniqueWithoutMapInput> = z.object({
  where: z.lazy(() => MerkleMapLeafWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MerkleMapLeafUpdateWithoutMapInputSchema),z.lazy(() => MerkleMapLeafUncheckedUpdateWithoutMapInputSchema) ]),
  create: z.union([ z.lazy(() => MerkleMapLeafCreateWithoutMapInputSchema),z.lazy(() => MerkleMapLeafUncheckedCreateWithoutMapInputSchema) ]),
}).strict();

export default MerkleMapLeafUpsertWithWhereUniqueWithoutMapInputSchema;
