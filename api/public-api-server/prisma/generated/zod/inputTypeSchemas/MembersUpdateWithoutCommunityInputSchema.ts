import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { NullableDateTimeFieldUpdateOperationsInputSchema } from './NullableDateTimeFieldUpdateOperationsInputSchema';
import { PersonUpdateOneRequiredWithoutMembersNestedInputSchema } from './PersonUpdateOneRequiredWithoutMembersNestedInputSchema';

export const MembersUpdateWithoutCommunityInputSchema: z.ZodType<Prisma.MembersUpdateWithoutCommunityInput> = z.object({
  role: z.union([ z.string().max(32),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdUtc: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  approvedUtc: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  person: z.lazy(() => PersonUpdateOneRequiredWithoutMembersNestedInputSchema).optional()
}).strict();

export default MembersUpdateWithoutCommunityInputSchema;
