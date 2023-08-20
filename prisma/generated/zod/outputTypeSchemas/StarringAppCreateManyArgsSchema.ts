import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StarringAppCreateManyInputSchema } from '../inputTypeSchemas/StarringAppCreateManyInputSchema'

export const StarringAppCreateManyArgsSchema: z.ZodType<Prisma.StarringAppCreateManyArgs> = z.object({
  data: z.union([ StarringAppCreateManyInputSchema,StarringAppCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default StarringAppCreateManyArgsSchema;
