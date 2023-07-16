import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MembersCreateWithoutPersonInputSchema } from './MembersCreateWithoutPersonInputSchema';
import { MembersUncheckedCreateWithoutPersonInputSchema } from './MembersUncheckedCreateWithoutPersonInputSchema';
import { MembersCreateOrConnectWithoutPersonInputSchema } from './MembersCreateOrConnectWithoutPersonInputSchema';
import { MembersCreateManyPersonInputEnvelopeSchema } from './MembersCreateManyPersonInputEnvelopeSchema';
import { MembersWhereUniqueInputSchema } from './MembersWhereUniqueInputSchema';

export const MembersCreateNestedManyWithoutPersonInputSchema: z.ZodType<Prisma.MembersCreateNestedManyWithoutPersonInput> = z.object({
  create: z.union([ z.lazy(() => MembersCreateWithoutPersonInputSchema),z.lazy(() => MembersCreateWithoutPersonInputSchema).array(),z.lazy(() => MembersUncheckedCreateWithoutPersonInputSchema),z.lazy(() => MembersUncheckedCreateWithoutPersonInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MembersCreateOrConnectWithoutPersonInputSchema),z.lazy(() => MembersCreateOrConnectWithoutPersonInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MembersCreateManyPersonInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MembersWhereUniqueInputSchema),z.lazy(() => MembersWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default MembersCreateNestedManyWithoutPersonInputSchema;
