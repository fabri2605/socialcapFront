import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PersonCreateWithoutMembersInputSchema } from './PersonCreateWithoutMembersInputSchema';
import { PersonUncheckedCreateWithoutMembersInputSchema } from './PersonUncheckedCreateWithoutMembersInputSchema';
import { PersonCreateOrConnectWithoutMembersInputSchema } from './PersonCreateOrConnectWithoutMembersInputSchema';
import { PersonWhereUniqueInputSchema } from './PersonWhereUniqueInputSchema';

export const PersonCreateNestedOneWithoutMembersInputSchema: z.ZodType<Prisma.PersonCreateNestedOneWithoutMembersInput> = z.object({
  create: z.union([ z.lazy(() => PersonCreateWithoutMembersInputSchema),z.lazy(() => PersonUncheckedCreateWithoutMembersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PersonCreateOrConnectWithoutMembersInputSchema).optional(),
  connect: z.lazy(() => PersonWhereUniqueInputSchema).optional()
}).strict();

export default PersonCreateNestedOneWithoutMembersInputSchema;
