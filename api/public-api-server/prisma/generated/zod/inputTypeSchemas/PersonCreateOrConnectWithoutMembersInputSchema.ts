import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PersonWhereUniqueInputSchema } from './PersonWhereUniqueInputSchema';
import { PersonCreateWithoutMembersInputSchema } from './PersonCreateWithoutMembersInputSchema';
import { PersonUncheckedCreateWithoutMembersInputSchema } from './PersonUncheckedCreateWithoutMembersInputSchema';

export const PersonCreateOrConnectWithoutMembersInputSchema: z.ZodType<Prisma.PersonCreateOrConnectWithoutMembersInput> = z.object({
  where: z.lazy(() => PersonWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PersonCreateWithoutMembersInputSchema),z.lazy(() => PersonUncheckedCreateWithoutMembersInputSchema) ]),
}).strict();

export default PersonCreateOrConnectWithoutMembersInputSchema;
