import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppWhereInputSchema } from '../inputTypeSchemas/AppWhereInputSchema'
import { AppOrderByWithAggregationInputSchema } from '../inputTypeSchemas/AppOrderByWithAggregationInputSchema'
import { AppScalarFieldEnumSchema } from '../inputTypeSchemas/AppScalarFieldEnumSchema'
import { AppScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/AppScalarWhereWithAggregatesInputSchema'

export const AppGroupByArgsSchema: z.ZodType<Prisma.AppGroupByArgs> = z.object({
  where: AppWhereInputSchema.optional(),
  orderBy: z.union([ AppOrderByWithAggregationInputSchema.array(),AppOrderByWithAggregationInputSchema ]).optional(),
  by: AppScalarFieldEnumSchema.array(),
  having: AppScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default AppGroupByArgsSchema;
