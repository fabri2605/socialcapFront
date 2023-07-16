import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PersonWhereInputSchema } from './PersonWhereInputSchema';
import { PersonUpdateWithoutMembersInputSchema } from './PersonUpdateWithoutMembersInputSchema';
import { PersonUncheckedUpdateWithoutMembersInputSchema } from './PersonUncheckedUpdateWithoutMembersInputSchema';

export const PersonUpdateToOneWithWhereWithoutMembersInputSchema: z.ZodType<Prisma.PersonUpdateToOneWithWhereWithoutMembersInput> = z.object({
  where: z.lazy(() => PersonWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PersonUpdateWithoutMembersInputSchema),z.lazy(() => PersonUncheckedUpdateWithoutMembersInputSchema) ]),
}).strict();

export default PersonUpdateToOneWithWhereWithoutMembersInputSchema;
