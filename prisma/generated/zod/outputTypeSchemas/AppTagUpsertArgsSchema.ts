import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppTagWhereUniqueInputSchema } from '../inputTypeSchemas/AppTagWhereUniqueInputSchema'
import { AppTagCreateInputSchema } from '../inputTypeSchemas/AppTagCreateInputSchema'
import { AppTagUncheckedCreateInputSchema } from '../inputTypeSchemas/AppTagUncheckedCreateInputSchema'
import { AppTagUpdateInputSchema } from '../inputTypeSchemas/AppTagUpdateInputSchema'
import { AppTagUncheckedUpdateInputSchema } from '../inputTypeSchemas/AppTagUncheckedUpdateInputSchema'

export const AppTagUpsertArgsSchema: z.ZodType<Omit<Prisma.AppTagUpsertArgs, "select" | "include">> = z.object({
  where: AppTagWhereUniqueInputSchema,
  create: z.union([ AppTagCreateInputSchema,AppTagUncheckedCreateInputSchema ]),
  update: z.union([ AppTagUpdateInputSchema,AppTagUncheckedUpdateInputSchema ]),
}).strict()

export default AppTagUpsertArgsSchema;
