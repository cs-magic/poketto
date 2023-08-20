import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppWhereInputSchema } from './AppWhereInputSchema';

export const AppListRelationFilterSchema: z.ZodType<Prisma.AppListRelationFilter> = z.object({
  every: z.lazy(() => AppWhereInputSchema).optional(),
  some: z.lazy(() => AppWhereInputSchema).optional(),
  none: z.lazy(() => AppWhereInputSchema).optional()
}).strict();

export default AppListRelationFilterSchema;
