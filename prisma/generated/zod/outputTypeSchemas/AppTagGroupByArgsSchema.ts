import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppTagWhereInputSchema } from '../inputTypeSchemas/AppTagWhereInputSchema'
import { AppTagOrderByWithAggregationInputSchema } from '../inputTypeSchemas/AppTagOrderByWithAggregationInputSchema'
import { AppTagScalarFieldEnumSchema } from '../inputTypeSchemas/AppTagScalarFieldEnumSchema'
import { AppTagScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/AppTagScalarWhereWithAggregatesInputSchema'

export const AppTagGroupByArgsSchema: z.ZodType<Prisma.AppTagGroupByArgs> = z.object({
  where: AppTagWhereInputSchema.optional(),
  orderBy: z.union([ AppTagOrderByWithAggregationInputSchema.array(),AppTagOrderByWithAggregationInputSchema ]).optional(),
  by: AppTagScalarFieldEnumSchema.array(),
  having: AppTagScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default AppTagGroupByArgsSchema;
