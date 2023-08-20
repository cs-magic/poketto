import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppCommentCreateInputSchema } from '../inputTypeSchemas/AppCommentCreateInputSchema'
import { AppCommentUncheckedCreateInputSchema } from '../inputTypeSchemas/AppCommentUncheckedCreateInputSchema'

export const AppCommentCreateArgsSchema: z.ZodType<Omit<Prisma.AppCommentCreateArgs, "select" | "include">> = z.object({
  data: z.union([ AppCommentCreateInputSchema,AppCommentUncheckedCreateInputSchema ]),
}).strict()

export default AppCommentCreateArgsSchema;
