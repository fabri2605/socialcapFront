import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MembersFindManyArgsSchema } from "../outputTypeSchemas/MembersFindManyArgsSchema"
import { PersonCountOutputTypeArgsSchema } from "../outputTypeSchemas/PersonCountOutputTypeArgsSchema"

export const PersonIncludeSchema: z.ZodType<Prisma.PersonInclude> = z.object({
  Members: z.union([z.boolean(),z.lazy(() => MembersFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PersonCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default PersonIncludeSchema;
