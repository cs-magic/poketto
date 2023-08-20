import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SessionWhereInputSchema } from '../inputTypeSchemas/SessionWhereInputSchema'
import { SessionOrderByWithRelationInputSchema } from '../inputTypeSchemas/SessionOrderByWithRelationInputSchema'
import { SessionWhereUniqueInputSchema } from '../inputTypeSchemas/SessionWhereUniqueInputSchema'
import { SessionScalarFieldEnumSchema } from '../inputTypeSchemas/SessionScalarFieldEnumSchema'

export const SessionFindFirstArgsSchema: z.ZodType<Omit<Prisma.SessionFindFirstArgs, "select" | "include">> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export default SessionFindFirstArgsSchema;
