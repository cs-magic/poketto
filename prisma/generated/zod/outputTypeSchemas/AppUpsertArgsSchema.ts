import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppWhereUniqueInputSchema } from '../inputTypeSchemas/AppWhereUniqueInputSchema'
import { AppCreateInputSchema } from '../inputTypeSchemas/AppCreateInputSchema'
import { AppUncheckedCreateInputSchema } from '../inputTypeSchemas/AppUncheckedCreateInputSchema'
import { AppUpdateInputSchema } from '../inputTypeSchemas/AppUpdateInputSchema'
import { AppUncheckedUpdateInputSchema } from '../inputTypeSchemas/AppUncheckedUpdateInputSchema'

export const AppUpsertArgsSchema: z.ZodType<Omit<Prisma.AppUpsertArgs, "select" | "include">> = z.object({
  where: AppWhereUniqueInputSchema,
  create: z.union([ AppCreateInputSchema,AppUncheckedCreateInputSchema ]),
  update: z.union([ AppUpdateInputSchema,AppUncheckedUpdateInputSchema ]),
}).strict()

export default AppUpsertArgsSchema;
