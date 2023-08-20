import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { NullableIntFieldUpdateOperationsInputSchema } from './NullableIntFieldUpdateOperationsInputSchema';
import { UserUpdateOneRequiredWithoutAppCommentsNestedInputSchema } from './UserUpdateOneRequiredWithoutAppCommentsNestedInputSchema';
import { AppUpdateOneRequiredWithoutCommentsNestedInputSchema } from './AppUpdateOneRequiredWithoutCommentsNestedInputSchema';

export const AppCommentUpdateInputSchema: z.ZodType<Prisma.AppCommentUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rate: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAppCommentsNestedInputSchema).optional(),
  aApp: z.lazy(() => AppUpdateOneRequiredWithoutCommentsNestedInputSchema).optional()
}).strict();

export default AppCommentUpdateInputSchema;
