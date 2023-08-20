import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCreateNestedOneWithoutStarringInputSchema } from './AppCreateNestedOneWithoutStarringInputSchema';

export const StarringAppCreateWithoutUserInputSchema: z.ZodType<Prisma.StarringAppCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  isActive: z.boolean().optional(),
  app: z.lazy(() => AppCreateNestedOneWithoutStarringInputSchema)
}).strict();

export default StarringAppCreateWithoutUserInputSchema;
