import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppActionCreateManyInputSchema } from '../inputTypeSchemas/AppActionCreateManyInputSchema'

export const AppActionCreateManyArgsSchema: z.ZodType<Prisma.AppActionCreateManyArgs> = z.object({
  data: z.union([ AppActionCreateManyInputSchema,AppActionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default AppActionCreateManyArgsSchema;
