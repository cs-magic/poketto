import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { UserUpdateOneRequiredWithoutFollowingNestedInputSchema } from './UserUpdateOneRequiredWithoutFollowingNestedInputSchema';

export const FollowRelationUpdateWithoutFromInputSchema: z.ZodType<Prisma.FollowRelationUpdateWithoutFromInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.lazy(() => UserUpdateOneRequiredWithoutFollowingNestedInputSchema).optional()
}).strict();

export default FollowRelationUpdateWithoutFromInputSchema;
