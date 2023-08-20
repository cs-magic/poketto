import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PlatformTypeSchema } from './PlatformTypeSchema';

export const AppPlatformCompoundUniqueInputSchema: z.ZodType<Prisma.AppPlatformCompoundUniqueInput> = z.object({
  platformType: z.lazy(() => PlatformTypeSchema),
  platformId: z.string()
}).strict();

export default AppPlatformCompoundUniqueInputSchema;
