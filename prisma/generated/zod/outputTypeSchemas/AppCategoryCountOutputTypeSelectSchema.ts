import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const AppCategoryCountOutputTypeSelectSchema: z.ZodType<Prisma.AppCategoryCountOutputTypeSelect> = z.object({
  App: z.boolean().optional(),
}).strict();

export default AppCategoryCountOutputTypeSelectSchema;
