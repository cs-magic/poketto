import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppWhereUniqueInputSchema } from '../inputTypeSchemas/AppWhereUniqueInputSchema'

export const AppFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.AppFindUniqueOrThrowArgs, "select" | "include">> = z.object({
  where: AppWhereUniqueInputSchema,
}).strict()

export default AppFindUniqueOrThrowArgsSchema;
