import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppActionSelectSchema } from '../inputTypeSchemas/AppActionSelectSchema';
import { AppActionIncludeSchema } from '../inputTypeSchemas/AppActionIncludeSchema';

export const AppActionArgsSchema: z.ZodType<Prisma.AppActionArgs> = z.object({
  select: z.lazy(() => AppActionSelectSchema).optional(),
  include: z.lazy(() => AppActionIncludeSchema).optional(),
}).strict();

export default AppActionArgsSchema;
