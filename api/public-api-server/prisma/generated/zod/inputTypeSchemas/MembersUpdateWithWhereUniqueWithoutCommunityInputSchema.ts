import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MembersWhereUniqueInputSchema } from './MembersWhereUniqueInputSchema';
import { MembersUpdateWithoutCommunityInputSchema } from './MembersUpdateWithoutCommunityInputSchema';
import { MembersUncheckedUpdateWithoutCommunityInputSchema } from './MembersUncheckedUpdateWithoutCommunityInputSchema';

export const MembersUpdateWithWhereUniqueWithoutCommunityInputSchema: z.ZodType<Prisma.MembersUpdateWithWhereUniqueWithoutCommunityInput> = z.object({
  where: z.lazy(() => MembersWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MembersUpdateWithoutCommunityInputSchema),z.lazy(() => MembersUncheckedUpdateWithoutCommunityInputSchema) ]),
}).strict();

export default MembersUpdateWithWhereUniqueWithoutCommunityInputSchema;
