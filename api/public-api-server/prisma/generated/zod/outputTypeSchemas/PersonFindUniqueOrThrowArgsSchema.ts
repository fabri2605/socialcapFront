import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonIncludeSchema } from '../inputTypeSchemas/PersonIncludeSchema'
import { PersonWhereUniqueInputSchema } from '../inputTypeSchemas/PersonWhereUniqueInputSchema'
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

export const PersonFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PersonFindUniqueOrThrowArgs> = z.object({
  select: PersonSelectSchema.optional(),
  include: PersonIncludeSchema.optional(),
  where: PersonWhereUniqueInputSchema,
}).strict()

export default PersonFindUniqueOrThrowArgsSchema;
