import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppTagCreateManyInputSchema } from '../inputTypeSchemas/AppTagCreateManyInputSchema'

export const AppTagCreateManyArgsSchema: z.ZodType<Prisma.AppTagCreateManyArgs> = z.object({
  data: z.union([ AppTagCreateManyInputSchema,AppTagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default AppTagCreateManyArgsSchema;
