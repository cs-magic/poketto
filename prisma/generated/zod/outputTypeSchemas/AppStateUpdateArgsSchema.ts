import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppStateUpdateInputSchema } from '../inputTypeSchemas/AppStateUpdateInputSchema'
import { AppStateUncheckedUpdateInputSchema } from '../inputTypeSchemas/AppStateUncheckedUpdateInputSchema'
import { AppStateWhereUniqueInputSchema } from '../inputTypeSchemas/AppStateWhereUniqueInputSchema'

export const AppStateUpdateArgsSchema: z.ZodType<Omit<Prisma.AppStateUpdateArgs, "select" | "include">> = z.object({
  data: z.union([ AppStateUpdateInputSchema,AppStateUncheckedUpdateInputSchema ]),
  where: AppStateWhereUniqueInputSchema,
}).strict()

export default AppStateUpdateArgsSchema;
