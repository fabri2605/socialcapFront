import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const MembersCommunityUidPersonUidCompoundUniqueInputSchema: z.ZodType<Prisma.MembersCommunityUidPersonUidCompoundUniqueInput> = z.object({
  communityUid: z.string(),
  personUid: z.string()
}).strict();

export default MembersCommunityUidPersonUidCompoundUniqueInputSchema;
