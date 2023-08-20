import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppWhereUniqueInputSchema } from '../inputTypeSchemas/AppWhereUniqueInputSchema'

export const AppFindUniqueArgsSchema: z.ZodType<Omit<Prisma.AppFindUniqueArgs, "select" | "include">> = z.object({
  where: AppWhereUniqueInputSchema,
}).strict()

export default AppFindUniqueArgsSchema;
