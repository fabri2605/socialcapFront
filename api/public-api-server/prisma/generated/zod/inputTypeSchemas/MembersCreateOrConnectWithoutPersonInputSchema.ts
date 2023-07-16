import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MembersWhereUniqueInputSchema } from './MembersWhereUniqueInputSchema';
import { MembersCreateWithoutPersonInputSchema } from './MembersCreateWithoutPersonInputSchema';
import { MembersUncheckedCreateWithoutPersonInputSchema } from './MembersUncheckedCreateWithoutPersonInputSchema';

export const MembersCreateOrConnectWithoutPersonInputSchema: z.ZodType<Prisma.MembersCreateOrConnectWithoutPersonInput> = z.object({
  where: z.lazy(() => MembersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MembersCreateWithoutPersonInputSchema),z.lazy(() => MembersUncheckedCreateWithoutPersonInputSchema) ]),
}).strict();

export default MembersCreateOrConnectWithoutPersonInputSchema;
