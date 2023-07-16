import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MerkleMapLeafCreateManyMapInputSchema } from './MerkleMapLeafCreateManyMapInputSchema';

export const MerkleMapLeafCreateManyMapInputEnvelopeSchema: z.ZodType<Prisma.MerkleMapLeafCreateManyMapInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MerkleMapLeafCreateManyMapInputSchema),z.lazy(() => MerkleMapLeafCreateManyMapInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default MerkleMapLeafCreateManyMapInputEnvelopeSchema;
