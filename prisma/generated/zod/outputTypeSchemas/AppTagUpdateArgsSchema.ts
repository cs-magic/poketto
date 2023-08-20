import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppTagUpdateInputSchema } from '../inputTypeSchemas/AppTagUpdateInputSchema'
import { AppTagUncheckedUpdateInputSchema } from '../inputTypeSchemas/AppTagUncheckedUpdateInputSchema'
import { AppTagWhereUniqueInputSchema } from '../inputTypeSchemas/AppTagWhereUniqueInputSchema'

export const AppTagUpdateArgsSchema: z.ZodType<Omit<Prisma.AppTagUpdateArgs, "select" | "include">> = z.object({
  data: z.union([ AppTagUpdateInputSchema,AppTagUncheckedUpdateInputSchema ]),
  where: AppTagWhereUniqueInputSchema,
}).strict()

export default AppTagUpdateArgsSchema;
