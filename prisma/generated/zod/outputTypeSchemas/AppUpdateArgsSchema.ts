import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppUpdateInputSchema } from '../inputTypeSchemas/AppUpdateInputSchema'
import { AppUncheckedUpdateInputSchema } from '../inputTypeSchemas/AppUncheckedUpdateInputSchema'
import { AppWhereUniqueInputSchema } from '../inputTypeSchemas/AppWhereUniqueInputSchema'

export const AppUpdateArgsSchema: z.ZodType<Omit<Prisma.AppUpdateArgs, "select" | "include">> = z.object({
  data: z.union([ AppUpdateInputSchema,AppUncheckedUpdateInputSchema ]),
  where: AppWhereUniqueInputSchema,
}).strict()

export default AppUpdateArgsSchema;
