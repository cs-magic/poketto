import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppWhereInputSchema } from './AppWhereInputSchema';

export const AppRelationFilterSchema: z.ZodType<Prisma.AppRelationFilter> = z.object({
  is: z.lazy(() => AppWhereInputSchema).optional(),
  isNot: z.lazy(() => AppWhereInputSchema).optional()
}).strict();

export default AppRelationFilterSchema;
