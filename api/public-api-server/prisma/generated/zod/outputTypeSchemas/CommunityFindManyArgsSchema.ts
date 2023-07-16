import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CommunityIncludeSchema } from '../inputTypeSchemas/CommunityIncludeSchema'
import { CommunityWhereInputSchema } from '../inputTypeSchemas/CommunityWhereInputSchema'
import { CommunityOrderByWithRelationInputSchema } from '../inputTypeSchemas/CommunityOrderByWithRelationInputSchema'
import { CommunityWhereUniqueInputSchema } from '../inputTypeSchemas/CommunityWhereUniqueInputSchema'
import { CommunityScalarFieldEnumSchema } from '../inputTypeSchemas/CommunityScalarFieldEnumSchema'
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

export const CommunityFindManyArgsSchema: z.ZodType<Prisma.CommunityFindManyArgs> = z.object({
  select: CommunitySelectSchema.optional(),
  include: CommunityIncludeSchema.optional(),
  where: CommunityWhereInputSchema.optional(),
  orderBy: z.union([ CommunityOrderByWithRelationInputSchema.array(),CommunityOrderByWithRelationInputSchema ]).optional(),
  cursor: CommunityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommunityScalarFieldEnumSchema,CommunityScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export default CommunityFindManyArgsSchema;
