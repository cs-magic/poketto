import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppTagWhereUniqueInputSchema } from '../inputTypeSchemas/AppTagWhereUniqueInputSchema'

export const AppTagFindUniqueArgsSchema: z.ZodType<Omit<Prisma.AppTagFindUniqueArgs, "select" | "include">> = z.object({
  where: AppTagWhereUniqueInputSchema,
}).strict()

export default AppTagFindUniqueArgsSchema;
