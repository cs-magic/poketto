import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StarringAppCreateInputSchema } from '../inputTypeSchemas/StarringAppCreateInputSchema'
import { StarringAppUncheckedCreateInputSchema } from '../inputTypeSchemas/StarringAppUncheckedCreateInputSchema'

export const StarringAppCreateArgsSchema: z.ZodType<Omit<Prisma.StarringAppCreateArgs, "select" | "include">> = z.object({
  data: z.union([ StarringAppCreateInputSchema,StarringAppUncheckedCreateInputSchema ]),
}).strict()

export default StarringAppCreateArgsSchema;
