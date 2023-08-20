import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppWhereInputSchema } from '../inputTypeSchemas/AppWhereInputSchema'

export const AppDeleteManyArgsSchema: z.ZodType<Prisma.AppDeleteManyArgs> = z.object({
  where: AppWhereInputSchema.optional(),
}).strict()

export default AppDeleteManyArgsSchema;
