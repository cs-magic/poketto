import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppStateWhereInputSchema } from './AppStateWhereInputSchema';

export const AppStateNullableRelationFilterSchema: z.ZodType<Prisma.AppStateNullableRelationFilter> = z.object({
  is: z.lazy(() => AppStateWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => AppStateWhereInputSchema).optional().nullable()
}).strict();

export default AppStateNullableRelationFilterSchema;
