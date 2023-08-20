import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppCategoryCountOutputTypeSelectSchema } from './AppCategoryCountOutputTypeSelectSchema';

export const AppCategoryCountOutputTypeArgsSchema: z.ZodType<Prisma.AppCategoryCountOutputTypeArgs> = z.object({
  select: z.lazy(() => AppCategoryCountOutputTypeSelectSchema).nullish(),
}).strict();

export default AppCategoryCountOutputTypeSelectSchema;
