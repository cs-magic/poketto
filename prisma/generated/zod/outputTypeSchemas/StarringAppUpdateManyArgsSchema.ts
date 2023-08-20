import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StarringAppUpdateManyMutationInputSchema } from '../inputTypeSchemas/StarringAppUpdateManyMutationInputSchema'
import { StarringAppUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/StarringAppUncheckedUpdateManyInputSchema'
import { StarringAppWhereInputSchema } from '../inputTypeSchemas/StarringAppWhereInputSchema'

export const StarringAppUpdateManyArgsSchema: z.ZodType<Prisma.StarringAppUpdateManyArgs> = z.object({
  data: z.union([ StarringAppUpdateManyMutationInputSchema,StarringAppUncheckedUpdateManyInputSchema ]),
  where: StarringAppWhereInputSchema.optional(),
}).strict()

export default StarringAppUpdateManyArgsSchema;
