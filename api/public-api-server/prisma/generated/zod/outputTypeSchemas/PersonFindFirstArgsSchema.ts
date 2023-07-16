import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonIncludeSchema } from '../inputTypeSchemas/PersonIncludeSchema'
import { PersonWhereInputSchema } from '../inputTypeSchemas/PersonWhereInputSchema'
import { PersonOrderByWithRelationInputSchema } from '../inputTypeSchemas/PersonOrderByWithRelationInputSchema'
import { PersonWhereUniqueInputSchema } from '../inputTypeSchemas/PersonWhereUniqueInputSchema'
import { PersonScalarFieldEnumSchema } from '../inputTypeSchemas/PersonScalarFieldEnumSchema'
import { MembersFindManyArgsSchema } from "../outputTypeSchemas/MembersFindManyArgsSchema"
import { PersonCountOutputTypeArgsSchema } from "../outputTypeSchemas/PersonCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PersonSelectSchema: z.ZodType<Prisma.PersonSelect> = z.object({
  uid: z.boolean().optional(),
  accountId: z.boolean().optional(),
  state: z.boolean().optional(),
  fullName: z.boolean().optional(),
  description: z.boolean().optional(),
  image: z.boolean().optional(),
  email: z.boolean().optional(),
  phone: z.boolean().optional(),
  telegram: z.boolean().optional(),
  preferences: z.boolean().optional(),
  createdUTC: z.boolean().optional(),
  updatedUTC: z.boolean().optional(),
  approvedUTC: z.boolean().optional(),
  Members: z.union([z.boolean(),z.lazy(() => MembersFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PersonCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PersonFindFirstArgsSchema: z.ZodType<Prisma.PersonFindFirstArgs> = z.object({
  select: PersonSelectSchema.optional(),
  include: PersonIncludeSchema.optional(),
  where: PersonWhereInputSchema.optional(),
  orderBy: z.union([ PersonOrderByWithRelationInputSchema.array(),PersonOrderByWithRelationInputSchema ]).optional(),
  cursor: PersonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PersonScalarFieldEnumSchema,PersonScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export default PersonFindFirstArgsSchema;
