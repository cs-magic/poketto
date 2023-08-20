import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppActionWhereInputSchema } from './AppActionWhereInputSchema';

export const AppActionListRelationFilterSchema: z.ZodType<Prisma.AppActionListRelationFilter> = z.object({
  every: z.lazy(() => AppActionWhereInputSchema).optional(),
  some: z.lazy(() => AppActionWhereInputSchema).optional(),
  none: z.lazy(() => AppActionWhereInputSchema).optional()
}).strict();

export default AppActionListRelationFilterSchema;
