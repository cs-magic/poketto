import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppCommentCreateManyInputSchema } from '../inputTypeSchemas/AppCommentCreateManyInputSchema'

export const AppCommentCreateManyArgsSchema: z.ZodType<Prisma.AppCommentCreateManyArgs> = z.object({
  data: z.union([ AppCommentCreateManyInputSchema,AppCommentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default AppCommentCreateManyArgsSchema;
