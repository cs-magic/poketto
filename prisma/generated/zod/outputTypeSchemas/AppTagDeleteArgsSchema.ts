import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppTagWhereUniqueInputSchema } from '../inputTypeSchemas/AppTagWhereUniqueInputSchema'

export const AppTagDeleteArgsSchema: z.ZodType<Omit<Prisma.AppTagDeleteArgs, "select" | "include">> = z.object({
  where: AppTagWhereUniqueInputSchema,
}).strict()

export default AppTagDeleteArgsSchema;
