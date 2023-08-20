import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { AppUncheckedUpdateManyWithoutCategoryNestedInputSchema } from './AppUncheckedUpdateManyWithoutCategoryNestedInputSchema';

export const AppCategoryUncheckedUpdateInputSchema: z.ZodType<Prisma.AppCategoryUncheckedUpdateInput> = z.object({
  createdAt: z.union([ z.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  main: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sub: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  App: z.lazy(() => AppUncheckedUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export default AppCategoryUncheckedUpdateInputSchema;
