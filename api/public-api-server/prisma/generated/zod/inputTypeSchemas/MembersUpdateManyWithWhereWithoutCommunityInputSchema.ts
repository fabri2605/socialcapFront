import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MembersScalarWhereInputSchema } from './MembersScalarWhereInputSchema';
import { MembersUpdateManyMutationInputSchema } from './MembersUpdateManyMutationInputSchema';
import { MembersUncheckedUpdateManyWithoutCommunityInputSchema } from './MembersUncheckedUpdateManyWithoutCommunityInputSchema';

export const MembersUpdateManyWithWhereWithoutCommunityInputSchema: z.ZodType<Prisma.MembersUpdateManyWithWhereWithoutCommunityInput> = z.object({
  where: z.lazy(() => MembersScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MembersUpdateManyMutationInputSchema),z.lazy(() => MembersUncheckedUpdateManyWithoutCommunityInputSchema) ]),
}).strict();

export default MembersUpdateManyWithWhereWithoutCommunityInputSchema;
