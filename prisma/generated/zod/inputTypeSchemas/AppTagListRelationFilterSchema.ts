import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppTagWhereInputSchema } from './AppTagWhereInputSchema';

export const AppTagListRelationFilterSchema: z.ZodType<Prisma.AppTagListRelationFilter> = z.object({
  every: z.lazy(() => AppTagWhereInputSchema).optional(),
  some: z.lazy(() => AppTagWhereInputSchema).optional(),
  none: z.lazy(() => AppTagWhereInputSchema).optional()
}).strict();

export default AppTagListRelationFilterSchema;
