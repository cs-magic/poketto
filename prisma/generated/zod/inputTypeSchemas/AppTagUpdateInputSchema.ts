import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableDateTimeFieldUpdateOperationsInputSchema } from './NullableDateTimeFieldUpdateOperationsInputSchema';
import { UserUpdateOneWithoutTagsNestedInputSchema } from './UserUpdateOneWithoutTagsNestedInputSchema';
import { AppUpdateManyWithoutTagsNestedInputSchema } from './AppUpdateManyWithoutTagsNestedInputSchema';

export const AppTagUpdateInputSchema: z.ZodType<Prisma.AppTagUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  creator: z.lazy(() => UserUpdateOneWithoutTagsNestedInputSchema).optional(),
  apps: z.lazy(() => AppUpdateManyWithoutTagsNestedInputSchema).optional()
}).strict();

export default AppTagUpdateInputSchema;
