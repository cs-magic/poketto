import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableDateTimeFieldUpdateOperationsInputSchema } from './NullableDateTimeFieldUpdateOperationsInputSchema';
import { AppUpdateOneRequiredWithoutActionsNestedInputSchema } from './AppUpdateOneRequiredWithoutActionsNestedInputSchema';

export const AppActionUpdateWithoutUserInputSchema: z.ZodType<Prisma.AppActionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  app: z.lazy(() => AppUpdateOneRequiredWithoutActionsNestedInputSchema).optional()
}).strict();

export default AppActionUpdateWithoutUserInputSchema;
