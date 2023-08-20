import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppTagWhereInputSchema } from '../inputTypeSchemas/AppTagWhereInputSchema'

export const AppTagDeleteManyArgsSchema: z.ZodType<Prisma.AppTagDeleteManyArgs> = z.object({
  where: AppTagWhereInputSchema.optional(),
}).strict()

export default AppTagDeleteManyArgsSchema;
