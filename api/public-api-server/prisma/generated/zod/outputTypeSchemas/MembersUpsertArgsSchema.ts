import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MembersIncludeSchema } from '../inputTypeSchemas/MembersIncludeSchema'
import { MembersWhereUniqueInputSchema } from '../inputTypeSchemas/MembersWhereUniqueInputSchema'
import { MembersCreateInputSchema } from '../inputTypeSchemas/MembersCreateInputSchema'
import { MembersUncheckedCreateInputSchema } from '../inputTypeSchemas/MembersUncheckedCreateInputSchema'
import { MembersUpdateInputSchema } from '../inputTypeSchemas/MembersUpdateInputSchema'
import { MembersUncheckedUpdateInputSchema } from '../inputTypeSchemas/MembersUncheckedUpdateInputSchema'
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

export const MembersUpsertArgsSchema: z.ZodType<Prisma.MembersUpsertArgs> = z.object({
  select: MembersSelectSchema.optional(),
  include: MembersIncludeSchema.optional(),
  where: MembersWhereUniqueInputSchema,
  create: z.union([ MembersCreateInputSchema,MembersUncheckedCreateInputSchema ]),
  update: z.union([ MembersUpdateInputSchema,MembersUncheckedUpdateInputSchema ]),
}).strict()

export default MembersUpsertArgsSchema;
