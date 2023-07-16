import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { CommunityCreateWithoutMembersInputSchema } from './CommunityCreateWithoutMembersInputSchema';
import { CommunityUncheckedCreateWithoutMembersInputSchema } from './CommunityUncheckedCreateWithoutMembersInputSchema';
import { CommunityCreateOrConnectWithoutMembersInputSchema } from './CommunityCreateOrConnectWithoutMembersInputSchema';
import { CommunityUpsertWithoutMembersInputSchema } from './CommunityUpsertWithoutMembersInputSchema';
import { CommunityWhereUniqueInputSchema } from './CommunityWhereUniqueInputSchema';
import { CommunityUpdateToOneWithWhereWithoutMembersInputSchema } from './CommunityUpdateToOneWithWhereWithoutMembersInputSchema';
import { CommunityUpdateWithoutMembersInputSchema } from './CommunityUpdateWithoutMembersInputSchema';
import { CommunityUncheckedUpdateWithoutMembersInputSchema } from './CommunityUncheckedUpdateWithoutMembersInputSchema';

export const CommunityUpdateOneRequiredWithoutMembersNestedInputSchema: z.ZodType<Prisma.CommunityUpdateOneRequiredWithoutMembersNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommunityCreateWithoutMembersInputSchema),z.lazy(() => CommunityUncheckedCreateWithoutMembersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CommunityCreateOrConnectWithoutMembersInputSchema).optional(),
  upsert: z.lazy(() => CommunityUpsertWithoutMembersInputSchema).optional(),
  connect: z.lazy(() => CommunityWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CommunityUpdateToOneWithWhereWithoutMembersInputSchema),z.lazy(() => CommunityUpdateWithoutMembersInputSchema),z.lazy(() => CommunityUncheckedUpdateWithoutMembersInputSchema) ]).optional(),
}).strict();

export default CommunityUpdateOneRequiredWithoutMembersNestedInputSchema;
