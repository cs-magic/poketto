import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppStateCreateManyInputSchema } from '../inputTypeSchemas/AppStateCreateManyInputSchema'

export const AppStateCreateManyArgsSchema: z.ZodType<Prisma.AppStateCreateManyArgs> = z.object({
  data: z.union([ AppStateCreateManyInputSchema,AppStateCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default AppStateCreateManyArgsSchema;
