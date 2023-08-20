import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StarringAppWhereInputSchema } from '../inputTypeSchemas/StarringAppWhereInputSchema'

export const StarringAppDeleteManyArgsSchema: z.ZodType<Prisma.StarringAppDeleteManyArgs> = z.object({
  where: StarringAppWhereInputSchema.optional(),
}).strict()

export default StarringAppDeleteManyArgsSchema;
