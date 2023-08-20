import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableDateTimeFieldUpdateOperationsInputSchema } from './NullableDateTimeFieldUpdateOperationsInputSchema';
import { UserUpdateOneWithoutAppActionsNestedInputSchema } from './UserUpdateOneWithoutAppActionsNestedInputSchema';
import { AppUpdateOneRequiredWithoutActionsNestedInputSchema } from './AppUpdateOneRequiredWithoutActionsNestedInputSchema';

export const AppActionUpdateInputSchema: z.ZodType<Prisma.AppActionUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutAppActionsNestedInputSchema).optional(),
  app: z.lazy(() => AppUpdateOneRequiredWithoutActionsNestedInputSchema).optional()
}).strict();

export default AppActionUpdateInputSchema;
