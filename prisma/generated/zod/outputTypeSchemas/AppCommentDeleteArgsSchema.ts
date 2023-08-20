import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppCommentWhereUniqueInputSchema } from '../inputTypeSchemas/AppCommentWhereUniqueInputSchema'

export const AppCommentDeleteArgsSchema: z.ZodType<Omit<Prisma.AppCommentDeleteArgs, "select" | "include">> = z.object({
  where: AppCommentWhereUniqueInputSchema,
}).strict()

export default AppCommentDeleteArgsSchema;
