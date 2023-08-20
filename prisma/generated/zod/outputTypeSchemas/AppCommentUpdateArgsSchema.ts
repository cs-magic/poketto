import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppCommentUpdateInputSchema } from '../inputTypeSchemas/AppCommentUpdateInputSchema'
import { AppCommentUncheckedUpdateInputSchema } from '../inputTypeSchemas/AppCommentUncheckedUpdateInputSchema'
import { AppCommentWhereUniqueInputSchema } from '../inputTypeSchemas/AppCommentWhereUniqueInputSchema'

export const AppCommentUpdateArgsSchema: z.ZodType<Omit<Prisma.AppCommentUpdateArgs, "select" | "include">> = z.object({
  data: z.union([ AppCommentUpdateInputSchema,AppCommentUncheckedUpdateInputSchema ]),
  where: AppCommentWhereUniqueInputSchema,
}).strict()

export default AppCommentUpdateArgsSchema;
