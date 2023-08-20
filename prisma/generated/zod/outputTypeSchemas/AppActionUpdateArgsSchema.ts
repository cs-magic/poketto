import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppActionUpdateInputSchema } from '../inputTypeSchemas/AppActionUpdateInputSchema'
import { AppActionUncheckedUpdateInputSchema } from '../inputTypeSchemas/AppActionUncheckedUpdateInputSchema'
import { AppActionWhereUniqueInputSchema } from '../inputTypeSchemas/AppActionWhereUniqueInputSchema'

export const AppActionUpdateArgsSchema: z.ZodType<Omit<Prisma.AppActionUpdateArgs, "select" | "include">> = z.object({
  data: z.union([ AppActionUpdateInputSchema,AppActionUncheckedUpdateInputSchema ]),
  where: AppActionWhereUniqueInputSchema,
}).strict()

export default AppActionUpdateArgsSchema;
