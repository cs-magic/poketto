import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { FollowRelationCountOrderByAggregateInputSchema } from './FollowRelationCountOrderByAggregateInputSchema';
import { FollowRelationMaxOrderByAggregateInputSchema } from './FollowRelationMaxOrderByAggregateInputSchema';
import { FollowRelationMinOrderByAggregateInputSchema } from './FollowRelationMinOrderByAggregateInputSchema';

export const FollowRelationOrderByWithAggregationInputSchema: z.ZodType<Prisma.FollowRelationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fromId: z.lazy(() => SortOrderSchema).optional(),
  toId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FollowRelationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FollowRelationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FollowRelationMinOrderByAggregateInputSchema).optional()
}).strict();

export default FollowRelationOrderByWithAggregationInputSchema;
