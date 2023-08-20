import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StarringAppSelectSchema } from '../inputTypeSchemas/StarringAppSelectSchema';
import { StarringAppIncludeSchema } from '../inputTypeSchemas/StarringAppIncludeSchema';

export const StarringAppArgsSchema: z.ZodType<Prisma.StarringAppArgs> = z.object({
  select: z.lazy(() => StarringAppSelectSchema).optional(),
  include: z.lazy(() => StarringAppIncludeSchema).optional(),
}).strict();

export default StarringAppArgsSchema;
