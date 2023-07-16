import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MembersCreateManyCommunityInputSchema } from './MembersCreateManyCommunityInputSchema';

export const MembersCreateManyCommunityInputEnvelopeSchema: z.ZodType<Prisma.MembersCreateManyCommunityInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MembersCreateManyCommunityInputSchema),z.lazy(() => MembersCreateManyCommunityInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default MembersCreateManyCommunityInputEnvelopeSchema;
