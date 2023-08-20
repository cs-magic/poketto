import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCreateNestedOneWithoutStarringInputSchema } from './AppCreateNestedOneWithoutStarringInputSchema';
import { UserCreateNestedOneWithoutStarringAppInputSchema } from './UserCreateNestedOneWithoutStarringAppInputSchema';

export const StarringAppCreateInputSchema: z.ZodType<Prisma.StarringAppCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  isActive: z.boolean().optional(),
  app: z.lazy(() => AppCreateNestedOneWithoutStarringInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutStarringAppInputSchema)
}).strict();

export default StarringAppCreateInputSchema;
