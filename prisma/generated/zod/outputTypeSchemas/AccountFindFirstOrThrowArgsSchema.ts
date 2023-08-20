import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AccountWhereInputSchema } from '../inputTypeSchemas/AccountWhereInputSchema'
import { AccountOrderByWithRelationInputSchema } from '../inputTypeSchemas/AccountOrderByWithRelationInputSchema'
import { AccountWhereUniqueInputSchema } from '../inputTypeSchemas/AccountWhereUniqueInputSchema'
import { AccountScalarFieldEnumSchema } from '../inputTypeSchemas/AccountScalarFieldEnumSchema'

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Omit<Prisma.AccountFindFirstOrThrowArgs, "select" | "include">> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export default AccountFindFirstOrThrowArgsSchema;
