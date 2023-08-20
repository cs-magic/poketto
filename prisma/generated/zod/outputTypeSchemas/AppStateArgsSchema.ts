import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppStateSelectSchema } from '../inputTypeSchemas/AppStateSelectSchema';
import { AppStateIncludeSchema } from '../inputTypeSchemas/AppStateIncludeSchema';

export const AppStateArgsSchema: z.ZodType<Prisma.AppStateArgs> = z.object({
  select: z.lazy(() => AppStateSelectSchema).optional(),
  include: z.lazy(() => AppStateIncludeSchema).optional(),
}).strict();

export default AppStateArgsSchema;
