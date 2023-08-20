import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppStateWhereInputSchema } from '../inputTypeSchemas/AppStateWhereInputSchema'

export const AppStateDeleteManyArgsSchema: z.ZodType<Prisma.AppStateDeleteManyArgs> = z.object({
  where: AppStateWhereInputSchema.optional(),
}).strict()

export default AppStateDeleteManyArgsSchema;
