import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { UserUpdateOneRequiredWithoutFollowedByNestedInputSchema } from './UserUpdateOneRequiredWithoutFollowedByNestedInputSchema';

export const FollowRelationUpdateWithoutToInputSchema: z.ZodType<Prisma.FollowRelationUpdateWithoutToInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  from: z.lazy(() => UserUpdateOneRequiredWithoutFollowedByNestedInputSchema).optional()
}).strict();

export default FollowRelationUpdateWithoutToInputSchema;
