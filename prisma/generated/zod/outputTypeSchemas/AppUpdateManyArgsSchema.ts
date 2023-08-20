import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppUpdateManyMutationInputSchema } from '../inputTypeSchemas/AppUpdateManyMutationInputSchema'
import { AppUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/AppUncheckedUpdateManyInputSchema'
import { AppWhereInputSchema } from '../inputTypeSchemas/AppWhereInputSchema'

export const AppUpdateManyArgsSchema: z.ZodType<Prisma.AppUpdateManyArgs> = z.object({
  data: z.union([ AppUpdateManyMutationInputSchema,AppUncheckedUpdateManyInputSchema ]),
  where: AppWhereInputSchema.optional(),
}).strict()

export default AppUpdateManyArgsSchema;
