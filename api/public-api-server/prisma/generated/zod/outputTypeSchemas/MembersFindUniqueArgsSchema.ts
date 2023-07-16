import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MembersIncludeSchema } from '../inputTypeSchemas/MembersIncludeSchema'
import { MembersWhereUniqueInputSchema } from '../inputTypeSchemas/MembersWhereUniqueInputSchema'
import { CommunityArgsSchema } from "../outputTypeSchemas/CommunityArgsSchema"
import { PersonArgsSchema } from "../outputTypeSchemas/PersonArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const MembersSelectSchema: z.ZodType<Prisma.MembersSelect> = z.object({
  communityUid: z.boolean().optional(),
  personUid: z.boolean().optional(),
  role: z.boolean().optional(),
  createdUtc: z.boolean().optional(),
  approvedUtc: z.boolean().optional(),
  community: z.union([z.boolean(),z.lazy(() => CommunityArgsSchema)]).optional(),
  person: z.union([z.boolean(),z.lazy(() => PersonArgsSchema)]).optional(),
}).strict()

export const MembersFindUniqueArgsSchema: z.ZodType<Prisma.MembersFindUniqueArgs> = z.object({
  select: MembersSelectSchema.optional(),
  include: MembersIncludeSchema.optional(),
  where: MembersWhereUniqueInputSchema,
}).strict()

export default MembersFindUniqueArgsSchema;
