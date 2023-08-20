import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCreateNestedManyWithoutTagsInputSchema } from './AppCreateNestedManyWithoutTagsInputSchema';

export const AppTagCreateWithoutCreatorInputSchema: z.ZodType<Prisma.AppTagCreateWithoutCreatorInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
  name: z.string(),
  apps: z.lazy(() => AppCreateNestedManyWithoutTagsInputSchema).optional()
}).strict();

export default AppTagCreateWithoutCreatorInputSchema;
