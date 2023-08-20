import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AccountWhereUniqueInputSchema } from '../inputTypeSchemas/AccountWhereUniqueInputSchema'

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.AccountFindUniqueOrThrowArgs, "select" | "include">> = z.object({
  where: AccountWhereUniqueInputSchema,
}).strict()

export default AccountFindUniqueOrThrowArgsSchema;
