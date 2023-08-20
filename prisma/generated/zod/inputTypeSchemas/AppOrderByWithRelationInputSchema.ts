import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { UserOrderByWithRelationInputSchema } from './UserOrderByWithRelationInputSchema';
import { AppTagOrderByRelationAggregateInputSchema } from './AppTagOrderByRelationAggregateInputSchema';
import { AppCategoryOrderByWithRelationInputSchema } from './AppCategoryOrderByWithRelationInputSchema';
import { AppActionOrderByRelationAggregateInputSchema } from './AppActionOrderByRelationAggregateInputSchema';
import { ConversationOrderByRelationAggregateInputSchema } from './ConversationOrderByRelationAggregateInputSchema';
import { StarringAppOrderByRelationAggregateInputSchema } from './StarringAppOrderByRelationAggregateInputSchema';
import { AppCommentOrderByRelationAggregateInputSchema } from './AppCommentOrderByRelationAggregateInputSchema';
import { AppStateOrderByWithRelationInputSchema } from './AppStateOrderByWithRelationInputSchema';

export const AppOrderByWithRelationInputSchema: z.ZodType<Prisma.AppOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  platformType: z.lazy(() => SortOrderSchema).optional(),
  platformId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  creatorId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  desc: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  categoryMain: z.lazy(() => SortOrderSchema).optional(),
  categorySub: z.lazy(() => SortOrderSchema).optional(),
  modelName: z.lazy(() => SortOrderSchema).optional(),
  isOpenSource: z.lazy(() => SortOrderSchema).optional(),
  modelArgs: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  creator: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  tags: z.lazy(() => AppTagOrderByRelationAggregateInputSchema).optional(),
  category: z.lazy(() => AppCategoryOrderByWithRelationInputSchema).optional(),
  actions: z.lazy(() => AppActionOrderByRelationAggregateInputSchema).optional(),
  using: z.lazy(() => ConversationOrderByRelationAggregateInputSchema).optional(),
  starring: z.lazy(() => StarringAppOrderByRelationAggregateInputSchema).optional(),
  comments: z.lazy(() => AppCommentOrderByRelationAggregateInputSchema).optional(),
  state: z.lazy(() => AppStateOrderByWithRelationInputSchema).optional()
}).strict();

export default AppOrderByWithRelationInputSchema;
