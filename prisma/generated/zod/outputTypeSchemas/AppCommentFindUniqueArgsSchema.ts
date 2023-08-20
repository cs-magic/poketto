import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppCommentWhereUniqueInputSchema } from '../inputTypeSchemas/AppCommentWhereUniqueInputSchema'

export const AppCommentFindUniqueArgsSchema: z.ZodType<Omit<Prisma.AppCommentFindUniqueArgs, "select" | "include">> = z.object({
  where: AppCommentWhereUniqueInputSchema,
}).strict()

export default AppCommentFindUniqueArgsSchema;
