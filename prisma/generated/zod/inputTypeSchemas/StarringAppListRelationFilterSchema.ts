import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StarringAppWhereInputSchema } from './StarringAppWhereInputSchema';

export const StarringAppListRelationFilterSchema: z.ZodType<Prisma.StarringAppListRelationFilter> = z.object({
  every: z.lazy(() => StarringAppWhereInputSchema).optional(),
  some: z.lazy(() => StarringAppWhereInputSchema).optional(),
  none: z.lazy(() => StarringAppWhereInputSchema).optional()
}).strict();

export default StarringAppListRelationFilterSchema;
