import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MembersIncludeSchema } from '../inputTypeSchemas/MembersIncludeSchema'
import { MembersWhereInputSchema } from '../inputTypeSchemas/MembersWhereInputSchema'
import { MembersOrderByWithRelationInputSchema } from '../inputTypeSchemas/MembersOrderByWithRelationInputSchema'
import { MembersWhereUniqueInputSchema } from '../inputTypeSchemas/MembersWhereUniqueInputSchema'
import { MembersScalarFieldEnumSchema } from '../inputTypeSchemas/MembersScalarFieldEnumSchema'
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

export const MembersFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MembersFindFirstOrThrowArgs> = z.object({
  select: MembersSelectSchema.optional(),
  include: MembersIncludeSchema.optional(),
  where: MembersWhereInputSchema.optional(),
  orderBy: z.union([ MembersOrderByWithRelationInputSchema.array(),MembersOrderByWithRelationInputSchema ]).optional(),
  cursor: MembersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MembersScalarFieldEnumSchema,MembersScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export default MembersFindFirstOrThrowArgsSchema;
