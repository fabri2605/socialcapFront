import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MembersIncludeSchema } from '../inputTypeSchemas/MembersIncludeSchema'
import { MembersUpdateInputSchema } from '../inputTypeSchemas/MembersUpdateInputSchema'
import { MembersUncheckedUpdateInputSchema } from '../inputTypeSchemas/MembersUncheckedUpdateInputSchema'
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

export const MembersUpdateArgsSchema: z.ZodType<Prisma.MembersUpdateArgs> = z.object({
  select: MembersSelectSchema.optional(),
  include: MembersIncludeSchema.optional(),
  data: z.union([ MembersUpdateInputSchema,MembersUncheckedUpdateInputSchema ]),
  where: MembersWhereUniqueInputSchema,
}).strict()

export default MembersUpdateArgsSchema;
