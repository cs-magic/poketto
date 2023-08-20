import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AppStateWhereInputSchema } from '../inputTypeSchemas/AppStateWhereInputSchema'
import { AppStateOrderByWithRelationInputSchema } from '../inputTypeSchemas/AppStateOrderByWithRelationInputSchema'
import { AppStateWhereUniqueInputSchema } from '../inputTypeSchemas/AppStateWhereUniqueInputSchema'
import { AppStateScalarFieldEnumSchema } from '../inputTypeSchemas/AppStateScalarFieldEnumSchema'

export const AppStateFindManyArgsSchema: z.ZodType<Omit<Prisma.AppStateFindManyArgs, "select" | "include">> = z.object({
  where: AppStateWhereInputSchema.optional(),
  orderBy: z.union([ AppStateOrderByWithRelationInputSchema.array(),AppStateOrderByWithRelationInputSchema ]).optional(),
  cursor: AppStateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AppStateScalarFieldEnumSchema,AppStateScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export default AppStateFindManyArgsSchema;
