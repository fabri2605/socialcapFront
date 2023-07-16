import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MembersWhereUniqueInputSchema } from './MembersWhereUniqueInputSchema';
import { MembersUpdateWithoutCommunityInputSchema } from './MembersUpdateWithoutCommunityInputSchema';
import { MembersUncheckedUpdateWithoutCommunityInputSchema } from './MembersUncheckedUpdateWithoutCommunityInputSchema';
import { MembersCreateWithoutCommunityInputSchema } from './MembersCreateWithoutCommunityInputSchema';
import { MembersUncheckedCreateWithoutCommunityInputSchema } from './MembersUncheckedCreateWithoutCommunityInputSchema';

export const MembersUpsertWithWhereUniqueWithoutCommunityInputSchema: z.ZodType<Prisma.MembersUpsertWithWhereUniqueWithoutCommunityInput> = z.object({
  where: z.lazy(() => MembersWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MembersUpdateWithoutCommunityInputSchema),z.lazy(() => MembersUncheckedUpdateWithoutCommunityInputSchema) ]),
  create: z.union([ z.lazy(() => MembersCreateWithoutCommunityInputSchema),z.lazy(() => MembersUncheckedCreateWithoutCommunityInputSchema) ]),
}).strict();

export default MembersUpsertWithWhereUniqueWithoutCommunityInputSchema;
