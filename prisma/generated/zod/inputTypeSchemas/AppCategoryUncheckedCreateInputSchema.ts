import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppUncheckedCreateNestedManyWithoutCategoryInputSchema } from './AppUncheckedCreateNestedManyWithoutCategoryInputSchema';

export const AppCategoryUncheckedCreateInputSchema: z.ZodType<Prisma.AppCategoryUncheckedCreateInput> = z.object({
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  main: z.number(),
  sub: z.number(),
  App: z.lazy(() => AppUncheckedCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export default AppCategoryUncheckedCreateInputSchema;
