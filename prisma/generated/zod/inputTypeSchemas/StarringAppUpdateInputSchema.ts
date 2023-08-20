import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { BoolFieldUpdateOperationsInputSchema } from './BoolFieldUpdateOperationsInputSchema';
import { AppUpdateOneRequiredWithoutStarringNestedInputSchema } from './AppUpdateOneRequiredWithoutStarringNestedInputSchema';
import { UserUpdateOneRequiredWithoutStarringAppNestedInputSchema } from './UserUpdateOneRequiredWithoutStarringAppNestedInputSchema';

export const StarringAppUpdateInputSchema: z.ZodType<Prisma.StarringAppUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  app: z.lazy(() => AppUpdateOneRequiredWithoutStarringNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutStarringAppNestedInputSchema).optional()
}).strict();

export default StarringAppUpdateInputSchema;
