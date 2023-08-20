import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppStateUpdateManyMutationInputSchema } from '../inputTypeSchemas/AppStateUpdateManyMutationInputSchema'
import { AppStateUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/AppStateUncheckedUpdateManyInputSchema'
import { AppStateWhereInputSchema } from '../inputTypeSchemas/AppStateWhereInputSchema'

export const AppStateUpdateManyArgsSchema: z.ZodType<Prisma.AppStateUpdateManyArgs> = z.object({
  data: z.union([ AppStateUpdateManyMutationInputSchema,AppStateUncheckedUpdateManyInputSchema ]),
  where: AppStateWhereInputSchema.optional(),
}).strict()

export default AppStateUpdateManyArgsSchema;
