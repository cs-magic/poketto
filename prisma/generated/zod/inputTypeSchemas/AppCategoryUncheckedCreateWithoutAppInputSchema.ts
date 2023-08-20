import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const AppCategoryUncheckedCreateWithoutAppInputSchema: z.ZodType<Prisma.AppCategoryUncheckedCreateWithoutAppInput> = z.object({
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  main: z.number(),
  sub: z.number()
}).strict();

export default AppCategoryUncheckedCreateWithoutAppInputSchema;
