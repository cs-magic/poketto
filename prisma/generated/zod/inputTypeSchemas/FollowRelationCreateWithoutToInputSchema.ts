import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateNestedOneWithoutFollowedByInputSchema } from './UserCreateNestedOneWithoutFollowedByInputSchema';

export const FollowRelationCreateWithoutToInputSchema: z.ZodType<Prisma.FollowRelationCreateWithoutToInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  from: z.lazy(() => UserCreateNestedOneWithoutFollowedByInputSchema)
}).strict();

export default FollowRelationCreateWithoutToInputSchema;
