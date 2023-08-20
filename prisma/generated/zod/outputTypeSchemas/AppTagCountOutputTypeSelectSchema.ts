import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const AppTagCountOutputTypeSelectSchema: z.ZodType<Prisma.AppTagCountOutputTypeSelect> = z.object({
  apps: z.boolean().optional(),
}).strict();

export default AppTagCountOutputTypeSelectSchema;
