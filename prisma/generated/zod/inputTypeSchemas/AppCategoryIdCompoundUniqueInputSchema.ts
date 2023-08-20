import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const AppCategoryIdCompoundUniqueInputSchema: z.ZodType<Prisma.AppCategoryIdCompoundUniqueInput> = z.object({
  main: z.number(),
  sub: z.number()
}).strict();

export default AppCategoryIdCompoundUniqueInputSchema;
