import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CommunityArgsSchema } from "../outputTypeSchemas/CommunityArgsSchema"
import { PersonArgsSchema } from "../outputTypeSchemas/PersonArgsSchema"

export const MembersIncludeSchema: z.ZodType<Prisma.MembersInclude> = z.object({
  community: z.union([z.boolean(),z.lazy(() => CommunityArgsSchema)]).optional(),
  person: z.union([z.boolean(),z.lazy(() => PersonArgsSchema)]).optional(),
}).strict()

export default MembersIncludeSchema;
