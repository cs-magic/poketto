import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppWhereUniqueInputSchema } from '../inputTypeSchemas/AppWhereUniqueInputSchema'

export const AppDeleteArgsSchema: z.ZodType<Omit<Prisma.AppDeleteArgs, "select" | "include">> = z.object({
  where: AppWhereUniqueInputSchema,
}).strict()

export default AppDeleteArgsSchema;
