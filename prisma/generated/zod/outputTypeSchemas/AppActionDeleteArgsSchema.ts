import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppActionWhereUniqueInputSchema } from '../inputTypeSchemas/AppActionWhereUniqueInputSchema'

export const AppActionDeleteArgsSchema: z.ZodType<Omit<Prisma.AppActionDeleteArgs, "select" | "include">> = z.object({
  where: AppActionWhereUniqueInputSchema,
}).strict()

export default AppActionDeleteArgsSchema;
