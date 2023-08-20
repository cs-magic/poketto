import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateNestedOneWithoutFollowedByInputSchema } from './UserCreateNestedOneWithoutFollowedByInputSchema';
import { UserCreateNestedOneWithoutFollowingInputSchema } from './UserCreateNestedOneWithoutFollowingInputSchema';

export const FollowRelationCreateInputSchema: z.ZodType<Prisma.FollowRelationCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  from: z.lazy(() => UserCreateNestedOneWithoutFollowedByInputSchema),
  to: z.lazy(() => UserCreateNestedOneWithoutFollowingInputSchema)
}).strict();

export default FollowRelationCreateInputSchema;
