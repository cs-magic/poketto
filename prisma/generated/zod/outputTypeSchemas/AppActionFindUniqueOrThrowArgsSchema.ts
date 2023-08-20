import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppActionWhereUniqueInputSchema } from '../inputTypeSchemas/AppActionWhereUniqueInputSchema'

export const AppActionFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.AppActionFindUniqueOrThrowArgs, "select" | "include">> = z.object({
  where: AppActionWhereUniqueInputSchema,
}).strict()

export default AppActionFindUniqueOrThrowArgsSchema;
