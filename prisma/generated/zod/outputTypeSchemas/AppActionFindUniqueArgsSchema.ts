import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppActionWhereUniqueInputSchema } from '../inputTypeSchemas/AppActionWhereUniqueInputSchema'

export const AppActionFindUniqueArgsSchema: z.ZodType<Omit<Prisma.AppActionFindUniqueArgs, "select" | "include">> = z.object({
  where: AppActionWhereUniqueInputSchema,
}).strict()

export default AppActionFindUniqueArgsSchema;
