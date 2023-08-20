import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateNestedOneWithoutStarringAppInputSchema } from './UserCreateNestedOneWithoutStarringAppInputSchema';

export const StarringAppCreateWithoutAppInputSchema: z.ZodType<Prisma.StarringAppCreateWithoutAppInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  isActive: z.boolean().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutStarringAppInputSchema)
}).strict();

export default StarringAppCreateWithoutAppInputSchema;
