import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PlatformTypeSchema } from './PlatformTypeSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValue } from './InputJsonValue';

export const AppCreateManyInputSchema: z.ZodType<Prisma.AppCreateManyInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  creatorId: z.string(),
  name: z.string(),
  avatar: z.string(),
  desc: z.string(),
  language: z.string().optional(),
  version: z.string().optional(),
  categoryMain: z.number(),
  categorySub: z.number(),
  modelName: z.string(),
  isOpenSource: z.boolean().optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export default AppCreateManyInputSchema;
