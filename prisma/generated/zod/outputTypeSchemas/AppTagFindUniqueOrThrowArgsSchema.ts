import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppTagWhereUniqueInputSchema } from '../inputTypeSchemas/AppTagWhereUniqueInputSchema'

export const AppTagFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.AppTagFindUniqueOrThrowArgs, "select" | "include">> = z.object({
  where: AppTagWhereUniqueInputSchema,
}).strict()

export default AppTagFindUniqueOrThrowArgsSchema;
