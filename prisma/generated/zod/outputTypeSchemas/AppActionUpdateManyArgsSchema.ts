import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppActionUpdateManyMutationInputSchema } from '../inputTypeSchemas/AppActionUpdateManyMutationInputSchema'
import { AppActionUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/AppActionUncheckedUpdateManyInputSchema'
import { AppActionWhereInputSchema } from '../inputTypeSchemas/AppActionWhereInputSchema'

export const AppActionUpdateManyArgsSchema: z.ZodType<Prisma.AppActionUpdateManyArgs> = z.object({
  data: z.union([ AppActionUpdateManyMutationInputSchema,AppActionUncheckedUpdateManyInputSchema ]),
  where: AppActionWhereInputSchema.optional(),
}).strict()

export default AppActionUpdateManyArgsSchema;
