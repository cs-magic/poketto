import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppCommentUpdateManyMutationInputSchema } from '../inputTypeSchemas/AppCommentUpdateManyMutationInputSchema'
import { AppCommentUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/AppCommentUncheckedUpdateManyInputSchema'
import { AppCommentWhereInputSchema } from '../inputTypeSchemas/AppCommentWhereInputSchema'

export const AppCommentUpdateManyArgsSchema: z.ZodType<Prisma.AppCommentUpdateManyArgs> = z.object({
  data: z.union([ AppCommentUpdateManyMutationInputSchema,AppCommentUncheckedUpdateManyInputSchema ]),
  where: AppCommentWhereInputSchema.optional(),
}).strict()

export default AppCommentUpdateManyArgsSchema;
