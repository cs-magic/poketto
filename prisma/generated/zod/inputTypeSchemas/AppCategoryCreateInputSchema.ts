import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCreateNestedManyWithoutCategoryInputSchema } from './AppCreateNestedManyWithoutCategoryInputSchema';

export const AppCategoryCreateInputSchema: z.ZodType<Prisma.AppCategoryCreateInput> = z.object({
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  main: z.number(),
  sub: z.number(),
  App: z.lazy(() => AppCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export default AppCategoryCreateInputSchema;
