import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppStateCreateInputSchema } from '../inputTypeSchemas/AppStateCreateInputSchema'
import { AppStateUncheckedCreateInputSchema } from '../inputTypeSchemas/AppStateUncheckedCreateInputSchema'

export const AppStateCreateArgsSchema: z.ZodType<Omit<Prisma.AppStateCreateArgs, "select" | "include">> = z.object({
  data: z.union([ AppStateCreateInputSchema,AppStateUncheckedCreateInputSchema ]),
}).strict()

export default AppStateCreateArgsSchema;
