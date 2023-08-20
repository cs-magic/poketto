import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppTagUpdateManyMutationInputSchema } from '../inputTypeSchemas/AppTagUpdateManyMutationInputSchema'
import { AppTagUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/AppTagUncheckedUpdateManyInputSchema'
import { AppTagWhereInputSchema } from '../inputTypeSchemas/AppTagWhereInputSchema'

export const AppTagUpdateManyArgsSchema: z.ZodType<Prisma.AppTagUpdateManyArgs> = z.object({
  data: z.union([ AppTagUpdateManyMutationInputSchema,AppTagUncheckedUpdateManyInputSchema ]),
  where: AppTagWhereInputSchema.optional(),
}).strict()

export default AppTagUpdateManyArgsSchema;
