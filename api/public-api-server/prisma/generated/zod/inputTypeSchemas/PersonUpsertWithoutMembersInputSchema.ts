import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PersonUpdateWithoutMembersInputSchema } from './PersonUpdateWithoutMembersInputSchema';
import { PersonUncheckedUpdateWithoutMembersInputSchema } from './PersonUncheckedUpdateWithoutMembersInputSchema';
import { PersonCreateWithoutMembersInputSchema } from './PersonCreateWithoutMembersInputSchema';
import { PersonUncheckedCreateWithoutMembersInputSchema } from './PersonUncheckedCreateWithoutMembersInputSchema';
import { PersonWhereInputSchema } from './PersonWhereInputSchema';

export const PersonUpsertWithoutMembersInputSchema: z.ZodType<Prisma.PersonUpsertWithoutMembersInput> = z.object({
  update: z.union([ z.lazy(() => PersonUpdateWithoutMembersInputSchema),z.lazy(() => PersonUncheckedUpdateWithoutMembersInputSchema) ]),
  create: z.union([ z.lazy(() => PersonCreateWithoutMembersInputSchema),z.lazy(() => PersonUncheckedCreateWithoutMembersInputSchema) ]),
  where: z.lazy(() => PersonWhereInputSchema).optional()
}).strict();

export default PersonUpsertWithoutMembersInputSchema;
