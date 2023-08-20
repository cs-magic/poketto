import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppActionCreateInputSchema } from '../inputTypeSchemas/AppActionCreateInputSchema'
import { AppActionUncheckedCreateInputSchema } from '../inputTypeSchemas/AppActionUncheckedCreateInputSchema'

export const AppActionCreateArgsSchema: z.ZodType<Omit<Prisma.AppActionCreateArgs, "select" | "include">> = z.object({
  data: z.union([ AppActionCreateInputSchema,AppActionUncheckedCreateInputSchema ]),
}).strict()

export default AppActionCreateArgsSchema;
