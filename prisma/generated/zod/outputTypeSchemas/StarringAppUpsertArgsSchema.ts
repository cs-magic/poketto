import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StarringAppWhereUniqueInputSchema } from '../inputTypeSchemas/StarringAppWhereUniqueInputSchema'
import { StarringAppCreateInputSchema } from '../inputTypeSchemas/StarringAppCreateInputSchema'
import { StarringAppUncheckedCreateInputSchema } from '../inputTypeSchemas/StarringAppUncheckedCreateInputSchema'
import { StarringAppUpdateInputSchema } from '../inputTypeSchemas/StarringAppUpdateInputSchema'
import { StarringAppUncheckedUpdateInputSchema } from '../inputTypeSchemas/StarringAppUncheckedUpdateInputSchema'

export const StarringAppUpsertArgsSchema: z.ZodType<Omit<Prisma.StarringAppUpsertArgs, "select" | "include">> = z.object({
  where: StarringAppWhereUniqueInputSchema,
  create: z.union([ StarringAppCreateInputSchema,StarringAppUncheckedCreateInputSchema ]),
  update: z.union([ StarringAppUpdateInputSchema,StarringAppUncheckedUpdateInputSchema ]),
}).strict()

export default StarringAppUpsertArgsSchema;
