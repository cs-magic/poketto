import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PlatformTypeSchema } from './PlatformTypeSchema';

export const UserPlatformCompoundUniqueInputSchema: z.ZodType<Prisma.UserPlatformCompoundUniqueInput> = z.object({
  platformType: z.lazy(() => PlatformTypeSchema),
  platformId: z.string()
}).strict();

export default UserPlatformCompoundUniqueInputSchema;
