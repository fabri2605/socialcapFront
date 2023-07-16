import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MembersScalarWhereInputSchema } from './MembersScalarWhereInputSchema';
import { MembersUpdateManyMutationInputSchema } from './MembersUpdateManyMutationInputSchema';
import { MembersUncheckedUpdateManyWithoutPersonInputSchema } from './MembersUncheckedUpdateManyWithoutPersonInputSchema';

export const MembersUpdateManyWithWhereWithoutPersonInputSchema: z.ZodType<Prisma.MembersUpdateManyWithWhereWithoutPersonInput> = z.object({
  where: z.lazy(() => MembersScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MembersUpdateManyMutationInputSchema),z.lazy(() => MembersUncheckedUpdateManyWithoutPersonInputSchema) ]),
}).strict();

export default MembersUpdateManyWithWhereWithoutPersonInputSchema;
