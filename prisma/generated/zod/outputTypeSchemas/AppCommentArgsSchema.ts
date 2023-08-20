import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppCommentSelectSchema } from '../inputTypeSchemas/AppCommentSelectSchema';
import { AppCommentIncludeSchema } from '../inputTypeSchemas/AppCommentIncludeSchema';

export const AppCommentArgsSchema: z.ZodType<Prisma.AppCommentArgs> = z.object({
  select: z.lazy(() => AppCommentSelectSchema).optional(),
  include: z.lazy(() => AppCommentIncludeSchema).optional(),
}).strict();

export default AppCommentArgsSchema;
