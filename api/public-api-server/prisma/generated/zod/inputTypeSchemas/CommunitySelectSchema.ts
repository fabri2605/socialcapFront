import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MembersFindManyArgsSchema } from "../outputTypeSchemas/MembersFindManyArgsSchema"
import { CommunityCountOutputTypeArgsSchema } from "../outputTypeSchemas/CommunityCountOutputTypeArgsSchema"

export const CommunitySelectSchema: z.ZodType<Prisma.CommunitySelect> = z.object({
  uid: z.boolean().optional(),
  accountId: z.boolean().optional(),
  adminUid: z.boolean().optional(),
  state: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  image: z.boolean().optional(),
  createdUtc: z.boolean().optional(),
  updatedUtc: z.boolean().optional(),
  approvedUtc: z.boolean().optional(),
  Members: z.union([z.boolean(),z.lazy(() => MembersFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CommunityCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default CommunitySelectSchema;
