import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MerkleMapCreateWithoutLeafsInputSchema } from './MerkleMapCreateWithoutLeafsInputSchema';
import { MerkleMapUncheckedCreateWithoutLeafsInputSchema } from './MerkleMapUncheckedCreateWithoutLeafsInputSchema';
import { MerkleMapCreateOrConnectWithoutLeafsInputSchema } from './MerkleMapCreateOrConnectWithoutLeafsInputSchema';
import { MerkleMapUpsertWithoutLeafsInputSchema } from './MerkleMapUpsertWithoutLeafsInputSchema';
import { MerkleMapWhereUniqueInputSchema } from './MerkleMapWhereUniqueInputSchema';
import { MerkleMapUpdateToOneWithWhereWithoutLeafsInputSchema } from './MerkleMapUpdateToOneWithWhereWithoutLeafsInputSchema';
import { MerkleMapUpdateWithoutLeafsInputSchema } from './MerkleMapUpdateWithoutLeafsInputSchema';
import { MerkleMapUncheckedUpdateWithoutLeafsInputSchema } from './MerkleMapUncheckedUpdateWithoutLeafsInputSchema';

export const MerkleMapUpdateOneRequiredWithoutLeafsNestedInputSchema: z.ZodType<Prisma.MerkleMapUpdateOneRequiredWithoutLeafsNestedInput> = z.object({
  create: z.union([ z.lazy(() => MerkleMapCreateWithoutLeafsInputSchema),z.lazy(() => MerkleMapUncheckedCreateWithoutLeafsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MerkleMapCreateOrConnectWithoutLeafsInputSchema).optional(),
  upsert: z.lazy(() => MerkleMapUpsertWithoutLeafsInputSchema).optional(),
  connect: z.lazy(() => MerkleMapWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MerkleMapUpdateToOneWithWhereWithoutLeafsInputSchema),z.lazy(() => MerkleMapUpdateWithoutLeafsInputSchema),z.lazy(() => MerkleMapUncheckedUpdateWithoutLeafsInputSchema) ]).optional(),
}).strict();

export default MerkleMapUpdateOneRequiredWithoutLeafsNestedInputSchema;
