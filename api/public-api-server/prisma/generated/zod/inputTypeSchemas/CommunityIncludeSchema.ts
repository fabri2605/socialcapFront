import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MembersFindManyArgsSchema } from "../outputTypeSchemas/MembersFindManyArgsSchema"
import { CommunityCountOutputTypeArgsSchema } from "../outputTypeSchemas/CommunityCountOutputTypeArgsSchema"

export const CommunityIncludeSchema: z.ZodType<Prisma.CommunityInclude> = z.object({
  Members: z.union([z.boolean(),z.lazy(() => MembersFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CommunityCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default CommunityIncludeSchema;
