import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MembersWhereUniqueInputSchema } from './MembersWhereUniqueInputSchema';
import { MembersUpdateWithoutPersonInputSchema } from './MembersUpdateWithoutPersonInputSchema';
import { MembersUncheckedUpdateWithoutPersonInputSchema } from './MembersUncheckedUpdateWithoutPersonInputSchema';
import { MembersCreateWithoutPersonInputSchema } from './MembersCreateWithoutPersonInputSchema';
import { MembersUncheckedCreateWithoutPersonInputSchema } from './MembersUncheckedCreateWithoutPersonInputSchema';

export const MembersUpsertWithWhereUniqueWithoutPersonInputSchema: z.ZodType<Prisma.MembersUpsertWithWhereUniqueWithoutPersonInput> = z.object({
  where: z.lazy(() => MembersWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MembersUpdateWithoutPersonInputSchema),z.lazy(() => MembersUncheckedUpdateWithoutPersonInputSchema) ]),
  create: z.union([ z.lazy(() => MembersCreateWithoutPersonInputSchema),z.lazy(() => MembersUncheckedCreateWithoutPersonInputSchema) ]),
}).strict();

export default MembersUpsertWithWhereUniqueWithoutPersonInputSchema;
