import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppCommentWhereUniqueInputSchema } from '../inputTypeSchemas/AppCommentWhereUniqueInputSchema'

export const AppCommentFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.AppCommentFindUniqueOrThrowArgs, "select" | "include">> = z.object({
  where: AppCommentWhereUniqueInputSchema,
}).strict()

export default AppCommentFindUniqueOrThrowArgsSchema;
