import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { UserOrderByWithRelationInputSchema } from './UserOrderByWithRelationInputSchema';

export const FollowRelationOrderByWithRelationInputSchema: z.ZodType<Prisma.FollowRelationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fromId: z.lazy(() => SortOrderSchema).optional(),
  toId: z.lazy(() => SortOrderSchema).optional(),
  from: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  to: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export default FollowRelationOrderByWithRelationInputSchema;
