import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StarringAppUpdateInputSchema } from '../inputTypeSchemas/StarringAppUpdateInputSchema'
import { StarringAppUncheckedUpdateInputSchema } from '../inputTypeSchemas/StarringAppUncheckedUpdateInputSchema'
import { StarringAppWhereUniqueInputSchema } from '../inputTypeSchemas/StarringAppWhereUniqueInputSchema'

export const StarringAppUpdateArgsSchema: z.ZodType<Omit<Prisma.StarringAppUpdateArgs, "select" | "include">> = z.object({
  data: z.union([ StarringAppUpdateInputSchema,StarringAppUncheckedUpdateInputSchema ]),
  where: StarringAppWhereUniqueInputSchema,
}).strict()

export default StarringAppUpdateArgsSchema;
