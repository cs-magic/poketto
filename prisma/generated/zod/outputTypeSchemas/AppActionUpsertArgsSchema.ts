import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppActionWhereUniqueInputSchema } from '../inputTypeSchemas/AppActionWhereUniqueInputSchema'
import { AppActionCreateInputSchema } from '../inputTypeSchemas/AppActionCreateInputSchema'
import { AppActionUncheckedCreateInputSchema } from '../inputTypeSchemas/AppActionUncheckedCreateInputSchema'
import { AppActionUpdateInputSchema } from '../inputTypeSchemas/AppActionUpdateInputSchema'
import { AppActionUncheckedUpdateInputSchema } from '../inputTypeSchemas/AppActionUncheckedUpdateInputSchema'

export const AppActionUpsertArgsSchema: z.ZodType<Omit<Prisma.AppActionUpsertArgs, "select" | "include">> = z.object({
  where: AppActionWhereUniqueInputSchema,
  create: z.union([ AppActionCreateInputSchema,AppActionUncheckedCreateInputSchema ]),
  update: z.union([ AppActionUpdateInputSchema,AppActionUncheckedUpdateInputSchema ]),
}).strict()

export default AppActionUpsertArgsSchema;
