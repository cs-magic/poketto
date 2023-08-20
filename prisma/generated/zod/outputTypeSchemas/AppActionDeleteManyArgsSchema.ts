import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppActionWhereInputSchema } from '../inputTypeSchemas/AppActionWhereInputSchema'

export const AppActionDeleteManyArgsSchema: z.ZodType<Prisma.AppActionDeleteManyArgs> = z.object({
  where: AppActionWhereInputSchema.optional(),
}).strict()

export default AppActionDeleteManyArgsSchema;
