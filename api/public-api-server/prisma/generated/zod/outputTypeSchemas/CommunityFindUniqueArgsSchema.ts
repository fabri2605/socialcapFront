import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CommunityIncludeSchema } from '../inputTypeSchemas/CommunityIncludeSchema'
import { CommunityWhereUniqueInputSchema } from '../inputTypeSchemas/CommunityWhereUniqueInputSchema'
import { MembersFindManyArgsSchema } from "../outputTypeSchemas/MembersFindManyArgsSchema"
import { CommunityCountOutputTypeArgsSchema } from "../outputTypeSchemas/CommunityCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

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

export const CommunityFindUniqueArgsSchema: z.ZodType<Prisma.CommunityFindUniqueArgs> = z.object({
  select: CommunitySelectSchema.optional(),
  include: CommunityIncludeSchema.optional(),
  where: CommunityWhereUniqueInputSchema,
}).strict()

export default CommunityFindUniqueArgsSchema;
