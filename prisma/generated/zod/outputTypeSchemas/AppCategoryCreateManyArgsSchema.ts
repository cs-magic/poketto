import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppCategoryCreateManyInputSchema } from '../inputTypeSchemas/AppCategoryCreateManyInputSchema'

export const AppCategoryCreateManyArgsSchema: z.ZodType<Prisma.AppCategoryCreateManyArgs> = z.object({
  data: z.union([ AppCategoryCreateManyInputSchema,AppCategoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default AppCategoryCreateManyArgsSchema;
