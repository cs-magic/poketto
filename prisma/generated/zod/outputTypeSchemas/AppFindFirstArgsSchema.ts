import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppWhereInputSchema } from '../inputTypeSchemas/AppWhereInputSchema'
import { AppOrderByWithRelationInputSchema } from '../inputTypeSchemas/AppOrderByWithRelationInputSchema'
import { AppWhereUniqueInputSchema } from '../inputTypeSchemas/AppWhereUniqueInputSchema'
import { AppScalarFieldEnumSchema } from '../inputTypeSchemas/AppScalarFieldEnumSchema'

export const AppFindFirstArgsSchema: z.ZodType<Omit<Prisma.AppFindFirstArgs, "select" | "include">> = z.object({
  where: AppWhereInputSchema.optional(),
  orderBy: z.union([ AppOrderByWithRelationInputSchema.array(),AppOrderByWithRelationInputSchema ]).optional(),
  cursor: AppWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AppScalarFieldEnumSchema,AppScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export default AppFindFirstArgsSchema;
