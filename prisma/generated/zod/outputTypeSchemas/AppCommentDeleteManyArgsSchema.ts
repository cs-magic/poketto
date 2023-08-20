import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppCommentWhereInputSchema } from '../inputTypeSchemas/AppCommentWhereInputSchema'

export const AppCommentDeleteManyArgsSchema: z.ZodType<Prisma.AppCommentDeleteManyArgs> = z.object({
  where: AppCommentWhereInputSchema.optional(),
}).strict()

export default AppCommentDeleteManyArgsSchema;
