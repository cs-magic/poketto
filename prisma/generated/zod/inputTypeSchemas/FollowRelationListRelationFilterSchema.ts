import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { FollowRelationWhereInputSchema } from './FollowRelationWhereInputSchema';

export const FollowRelationListRelationFilterSchema: z.ZodType<Prisma.FollowRelationListRelationFilter> = z.object({
  every: z.lazy(() => FollowRelationWhereInputSchema).optional(),
  some: z.lazy(() => FollowRelationWhereInputSchema).optional(),
  none: z.lazy(() => FollowRelationWhereInputSchema).optional()
}).strict();

export default FollowRelationListRelationFilterSchema;
