import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppCommentWhereUniqueInputSchema } from '../inputTypeSchemas/AppCommentWhereUniqueInputSchema'
import { AppCommentCreateInputSchema } from '../inputTypeSchemas/AppCommentCreateInputSchema'
import { AppCommentUncheckedCreateInputSchema } from '../inputTypeSchemas/AppCommentUncheckedCreateInputSchema'
import { AppCommentUpdateInputSchema } from '../inputTypeSchemas/AppCommentUpdateInputSchema'
import { AppCommentUncheckedUpdateInputSchema } from '../inputTypeSchemas/AppCommentUncheckedUpdateInputSchema'

export const AppCommentUpsertArgsSchema: z.ZodType<Omit<Prisma.AppCommentUpsertArgs, "select" | "include">> = z.object({
  where: AppCommentWhereUniqueInputSchema,
  create: z.union([ AppCommentCreateInputSchema,AppCommentUncheckedCreateInputSchema ]),
  update: z.union([ AppCommentUpdateInputSchema,AppCommentUncheckedUpdateInputSchema ]),
}).strict()

export default AppCommentUpsertArgsSchema;
