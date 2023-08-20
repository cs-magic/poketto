import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppCreateManyInputSchema } from '../inputTypeSchemas/AppCreateManyInputSchema'

export const AppCreateManyArgsSchema: z.ZodType<Prisma.AppCreateManyArgs> = z.object({
  data: z.union([ AppCreateManyInputSchema,AppCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default AppCreateManyArgsSchema;
