import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCommentWhereInputSchema } from './AppCommentWhereInputSchema';

export const AppCommentListRelationFilterSchema: z.ZodType<Prisma.AppCommentListRelationFilter> = z.object({
  every: z.lazy(() => AppCommentWhereInputSchema).optional(),
  some: z.lazy(() => AppCommentWhereInputSchema).optional(),
  none: z.lazy(() => AppCommentWhereInputSchema).optional()
}).strict();

export default AppCommentListRelationFilterSchema;
