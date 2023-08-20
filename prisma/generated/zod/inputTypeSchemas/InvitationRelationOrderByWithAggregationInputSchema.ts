import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { InvitationRelationCountOrderByAggregateInputSchema } from './InvitationRelationCountOrderByAggregateInputSchema';
import { InvitationRelationMaxOrderByAggregateInputSchema } from './InvitationRelationMaxOrderByAggregateInputSchema';
import { InvitationRelationMinOrderByAggregateInputSchema } from './InvitationRelationMinOrderByAggregateInputSchema';

export const InvitationRelationOrderByWithAggregationInputSchema: z.ZodType<Prisma.InvitationRelationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  fromId: z.lazy(() => SortOrderSchema).optional(),
  toId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => InvitationRelationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => InvitationRelationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => InvitationRelationMinOrderByAggregateInputSchema).optional()
}).strict();

export default InvitationRelationOrderByWithAggregationInputSchema;
