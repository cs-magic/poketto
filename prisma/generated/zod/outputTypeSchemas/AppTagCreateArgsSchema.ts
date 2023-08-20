import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppTagCreateInputSchema } from '../inputTypeSchemas/AppTagCreateInputSchema'
import { AppTagUncheckedCreateInputSchema } from '../inputTypeSchemas/AppTagUncheckedCreateInputSchema'

export const AppTagCreateArgsSchema: z.ZodType<Omit<Prisma.AppTagCreateArgs, "select" | "include">> = z.object({
  data: z.union([ AppTagCreateInputSchema,AppTagUncheckedCreateInputSchema ]),
}).strict()

export default AppTagCreateArgsSchema;
