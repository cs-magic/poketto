import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppCreateInputSchema } from '../inputTypeSchemas/AppCreateInputSchema'
import { AppUncheckedCreateInputSchema } from '../inputTypeSchemas/AppUncheckedCreateInputSchema'

export const AppCreateArgsSchema: z.ZodType<Omit<Prisma.AppCreateArgs, "select" | "include">> = z.object({
  data: z.union([ AppCreateInputSchema,AppUncheckedCreateInputSchema ]),
}).strict()

export default AppCreateArgsSchema;
