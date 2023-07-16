import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { CommunityCreateWithoutMembersInputSchema } from './CommunityCreateWithoutMembersInputSchema';
import { CommunityUncheckedCreateWithoutMembersInputSchema } from './CommunityUncheckedCreateWithoutMembersInputSchema';
import { CommunityCreateOrConnectWithoutMembersInputSchema } from './CommunityCreateOrConnectWithoutMembersInputSchema';
import { CommunityWhereUniqueInputSchema } from './CommunityWhereUniqueInputSchema';

export const CommunityCreateNestedOneWithoutMembersInputSchema: z.ZodType<Prisma.CommunityCreateNestedOneWithoutMembersInput> = z.object({
  create: z.union([ z.lazy(() => CommunityCreateWithoutMembersInputSchema),z.lazy(() => CommunityUncheckedCreateWithoutMembersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CommunityCreateOrConnectWithoutMembersInputSchema).optional(),
  connect: z.lazy(() => CommunityWhereUniqueInputSchema).optional()
}).strict();

export default CommunityCreateNestedOneWithoutMembersInputSchema;
