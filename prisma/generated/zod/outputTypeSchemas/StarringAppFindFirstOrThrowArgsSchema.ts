import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StarringAppWhereInputSchema } from '../inputTypeSchemas/StarringAppWhereInputSchema'
import { StarringAppOrderByWithRelationInputSchema } from '../inputTypeSchemas/StarringAppOrderByWithRelationInputSchema'
import { StarringAppWhereUniqueInputSchema } from '../inputTypeSchemas/StarringAppWhereUniqueInputSchema'
import { StarringAppScalarFieldEnumSchema } from '../inputTypeSchemas/StarringAppScalarFieldEnumSchema'

export const StarringAppFindFirstOrThrowArgsSchema: z.ZodType<Omit<Prisma.StarringAppFindFirstOrThrowArgs, "select" | "include">> = z.object({
  where: StarringAppWhereInputSchema.optional(),
  orderBy: z.union([ StarringAppOrderByWithRelationInputSchema.array(),StarringAppOrderByWithRelationInputSchema ]).optional(),
  cursor: StarringAppWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StarringAppScalarFieldEnumSchema,StarringAppScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export default StarringAppFindFirstOrThrowArgsSchema;
