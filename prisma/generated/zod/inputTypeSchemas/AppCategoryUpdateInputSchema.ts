import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { AppUpdateManyWithoutCategoryNestedInputSchema } from './AppUpdateManyWithoutCategoryNestedInputSchema';

export const AppCategoryUpdateInputSchema: z.ZodType<Prisma.AppCategoryUpdateInput> = z.object({
  createdAt: z.union([ z.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  main: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sub: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  App: z.lazy(() => AppUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export default AppCategoryUpdateInputSchema;
