import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppStateWhereUniqueInputSchema } from '../inputTypeSchemas/AppStateWhereUniqueInputSchema'
import { AppStateCreateInputSchema } from '../inputTypeSchemas/AppStateCreateInputSchema'
import { AppStateUncheckedCreateInputSchema } from '../inputTypeSchemas/AppStateUncheckedCreateInputSchema'
import { AppStateUpdateInputSchema } from '../inputTypeSchemas/AppStateUpdateInputSchema'
import { AppStateUncheckedUpdateInputSchema } from '../inputTypeSchemas/AppStateUncheckedUpdateInputSchema'

export const AppStateUpsertArgsSchema: z.ZodType<Omit<Prisma.AppStateUpsertArgs, "select" | "include">> = z.object({
  where: AppStateWhereUniqueInputSchema,
  create: z.union([ AppStateCreateInputSchema,AppStateUncheckedCreateInputSchema ]),
  update: z.union([ AppStateUpdateInputSchema,AppStateUncheckedUpdateInputSchema ]),
}).strict()

export default AppStateUpsertArgsSchema;
