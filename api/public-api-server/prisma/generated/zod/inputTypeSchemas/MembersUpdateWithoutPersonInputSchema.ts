import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { NullableDateTimeFieldUpdateOperationsInputSchema } from './NullableDateTimeFieldUpdateOperationsInputSchema';
import { CommunityUpdateOneRequiredWithoutMembersNestedInputSchema } from './CommunityUpdateOneRequiredWithoutMembersNestedInputSchema';

export const MembersUpdateWithoutPersonInputSchema: z.ZodType<Prisma.MembersUpdateWithoutPersonInput> = z.object({
  role: z.union([ z.string().max(32),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdUtc: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  approvedUtc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  community: z.lazy(() => CommunityUpdateOneRequiredWithoutMembersNestedInputSchema).optional()
}).strict();

export default MembersUpdateWithoutPersonInputSchema;
