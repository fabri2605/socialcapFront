import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PersonCreateWithoutMembersInputSchema } from './PersonCreateWithoutMembersInputSchema';
import { PersonUncheckedCreateWithoutMembersInputSchema } from './PersonUncheckedCreateWithoutMembersInputSchema';
import { PersonCreateOrConnectWithoutMembersInputSchema } from './PersonCreateOrConnectWithoutMembersInputSchema';
import { PersonUpsertWithoutMembersInputSchema } from './PersonUpsertWithoutMembersInputSchema';
import { PersonWhereUniqueInputSchema } from './PersonWhereUniqueInputSchema';
import { PersonUpdateToOneWithWhereWithoutMembersInputSchema } from './PersonUpdateToOneWithWhereWithoutMembersInputSchema';
import { PersonUpdateWithoutMembersInputSchema } from './PersonUpdateWithoutMembersInputSchema';
import { PersonUncheckedUpdateWithoutMembersInputSchema } from './PersonUncheckedUpdateWithoutMembersInputSchema';

export const PersonUpdateOneRequiredWithoutMembersNestedInputSchema: z.ZodType<Prisma.PersonUpdateOneRequiredWithoutMembersNestedInput> = z.object({
  create: z.union([ z.lazy(() => PersonCreateWithoutMembersInputSchema),z.lazy(() => PersonUncheckedCreateWithoutMembersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PersonCreateOrConnectWithoutMembersInputSchema).optional(),
  upsert: z.lazy(() => PersonUpsertWithoutMembersInputSchema).optional(),
  connect: z.lazy(() => PersonWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PersonUpdateToOneWithWhereWithoutMembersInputSchema),z.lazy(() => PersonUpdateWithoutMembersInputSchema),z.lazy(() => PersonUncheckedUpdateWithoutMembersInputSchema) ]).optional(),
}).strict();

export default PersonUpdateOneRequiredWithoutMembersNestedInputSchema;
