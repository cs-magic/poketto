import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const AppCategoryCreateWithoutAppInputSchema: z.ZodType<Prisma.AppCategoryCreateWithoutAppInput> = z.object({
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  main: z.number(),
  sub: z.number()
}).strict();

export default AppCategoryCreateWithoutAppInputSchema;
