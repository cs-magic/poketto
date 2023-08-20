import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppTagWhereInputSchema } from '../inputTypeSchemas/AppTagWhereInputSchema'
import { AppTagOrderByWithRelationInputSchema } from '../inputTypeSchemas/AppTagOrderByWithRelationInputSchema'
import { AppTagWhereUniqueInputSchema } from '../inputTypeSchemas/AppTagWhereUniqueInputSchema'
import { AppTagScalarFieldEnumSchema } from '../inputTypeSchemas/AppTagScalarFieldEnumSchema'

export const AppTagFindFirstOrThrowArgsSchema: z.ZodType<Omit<Prisma.AppTagFindFirstOrThrowArgs, "select" | "include">> = z.object({
  where: AppTagWhereInputSchema.optional(),
  orderBy: z.union([ AppTagOrderByWithRelationInputSchema.array(),AppTagOrderByWithRelationInputSchema ]).optional(),
  cursor: AppTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AppTagScalarFieldEnumSchema,AppTagScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export default AppTagFindFirstOrThrowArgsSchema;
