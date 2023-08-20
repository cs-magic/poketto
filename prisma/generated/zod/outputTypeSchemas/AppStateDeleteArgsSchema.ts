import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppStateWhereUniqueInputSchema } from '../inputTypeSchemas/AppStateWhereUniqueInputSchema'

export const AppStateDeleteArgsSchema: z.ZodType<Omit<Prisma.AppStateDeleteArgs, "select" | "include">> = z.object({
  where: AppStateWhereUniqueInputSchema,
}).strict()

export default AppStateDeleteArgsSchema;
