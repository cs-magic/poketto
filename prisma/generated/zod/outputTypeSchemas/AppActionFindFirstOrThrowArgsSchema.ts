import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppActionWhereInputSchema } from '../inputTypeSchemas/AppActionWhereInputSchema'
import { AppActionOrderByWithRelationInputSchema } from '../inputTypeSchemas/AppActionOrderByWithRelationInputSchema'
import { AppActionWhereUniqueInputSchema } from '../inputTypeSchemas/AppActionWhereUniqueInputSchema'
import { AppActionScalarFieldEnumSchema } from '../inputTypeSchemas/AppActionScalarFieldEnumSchema'

export const AppActionFindFirstOrThrowArgsSchema: z.ZodType<Omit<Prisma.AppActionFindFirstOrThrowArgs, "select" | "include">> = z.object({
  where: AppActionWhereInputSchema.optional(),
  orderBy: z.union([ AppActionOrderByWithRelationInputSchema.array(),AppActionOrderByWithRelationInputSchema ]).optional(),
  cursor: AppActionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AppActionScalarFieldEnumSchema,AppActionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export default AppActionFindFirstOrThrowArgsSchema;
