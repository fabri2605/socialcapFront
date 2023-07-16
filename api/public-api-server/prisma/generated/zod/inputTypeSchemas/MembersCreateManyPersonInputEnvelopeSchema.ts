import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MembersCreateManyPersonInputSchema } from './MembersCreateManyPersonInputSchema';

export const MembersCreateManyPersonInputEnvelopeSchema: z.ZodType<Prisma.MembersCreateManyPersonInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MembersCreateManyPersonInputSchema),z.lazy(() => MembersCreateManyPersonInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default MembersCreateManyPersonInputEnvelopeSchema;
