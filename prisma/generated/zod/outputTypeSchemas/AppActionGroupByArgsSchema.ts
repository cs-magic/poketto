import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppActionWhereInputSchema } from '../inputTypeSchemas/AppActionWhereInputSchema'
import { AppActionOrderByWithAggregationInputSchema } from '../inputTypeSchemas/AppActionOrderByWithAggregationInputSchema'
import { AppActionScalarFieldEnumSchema } from '../inputTypeSchemas/AppActionScalarFieldEnumSchema'
import { AppActionScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/AppActionScalarWhereWithAggregatesInputSchema'

export const AppActionGroupByArgsSchema: z.ZodType<Prisma.AppActionGroupByArgs> = z.object({
  where: AppActionWhereInputSchema.optional(),
  orderBy: z.union([ AppActionOrderByWithAggregationInputSchema.array(),AppActionOrderByWithAggregationInputSchema ]).optional(),
  by: AppActionScalarFieldEnumSchema.array(),
  having: AppActionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default AppActionGroupByArgsSchema;
