import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateNestedOneWithoutFollowingInputSchema } from './UserCreateNestedOneWithoutFollowingInputSchema';

export const FollowRelationCreateWithoutFromInputSchema: z.ZodType<Prisma.FollowRelationCreateWithoutFromInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  to: z.lazy(() => UserCreateNestedOneWithoutFollowingInputSchema)
}).strict();

export default FollowRelationCreateWithoutFromInputSchema;
