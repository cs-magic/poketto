import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppStateWhereInputSchema } from '../inputTypeSchemas/AppStateWhereInputSchema'
import { AppStateOrderByWithAggregationInputSchema } from '../inputTypeSchemas/AppStateOrderByWithAggregationInputSchema'
import { AppStateScalarFieldEnumSchema } from '../inputTypeSchemas/AppStateScalarFieldEnumSchema'
import { AppStateScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/AppStateScalarWhereWithAggregatesInputSchema'

export const AppStateGroupByArgsSchema: z.ZodType<Prisma.AppStateGroupByArgs> = z.object({
  where: AppStateWhereInputSchema.optional(),
  orderBy: z.union([ AppStateOrderByWithAggregationInputSchema.array(),AppStateOrderByWithAggregationInputSchema ]).optional(),
  by: AppStateScalarFieldEnumSchema.array(),
  having: AppStateScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default AppStateGroupByArgsSchema;
