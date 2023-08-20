import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableDateTimeFieldUpdateOperationsInputSchema } from './NullableDateTimeFieldUpdateOperationsInputSchema';
import { AppUncheckedUpdateManyWithoutTagsNestedInputSchema } from './AppUncheckedUpdateManyWithoutTagsNestedInputSchema';

export const AppTagUncheckedUpdateWithoutCreatorInputSchema: z.ZodType<Prisma.AppTagUncheckedUpdateWithoutCreatorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  apps: z.lazy(() => AppUncheckedUpdateManyWithoutTagsNestedInputSchema).optional()
}).strict();

export default AppTagUncheckedUpdateWithoutCreatorInputSchema;
