import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCreateNestedOneWithoutStateInputSchema } from './AppCreateNestedOneWithoutStateInputSchema';

export const AppStateCreateInputSchema: z.ZodType<Prisma.AppStateCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
  views: z.number().optional(),
  stars: z.number().optional(),
  forks: z.number().optional(),
  tips: z.number().optional(),
  calls: z.number().optional(),
  shares: z.number().optional(),
  app: z.lazy(() => AppCreateNestedOneWithoutStateInputSchema)
}).strict();

export default AppStateCreateInputSchema;
