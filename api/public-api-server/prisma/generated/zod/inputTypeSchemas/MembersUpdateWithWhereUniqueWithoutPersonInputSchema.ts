import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MembersWhereUniqueInputSchema } from './MembersWhereUniqueInputSchema';
import { MembersUpdateWithoutPersonInputSchema } from './MembersUpdateWithoutPersonInputSchema';
import { MembersUncheckedUpdateWithoutPersonInputSchema } from './MembersUncheckedUpdateWithoutPersonInputSchema';

export const MembersUpdateWithWhereUniqueWithoutPersonInputSchema: z.ZodType<Prisma.MembersUpdateWithWhereUniqueWithoutPersonInput> = z.object({
  where: z.lazy(() => MembersWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MembersUpdateWithoutPersonInputSchema),z.lazy(() => MembersUncheckedUpdateWithoutPersonInputSchema) ]),
}).strict();

export default MembersUpdateWithWhereUniqueWithoutPersonInputSchema;
