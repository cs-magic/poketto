import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AccountWhereUniqueInputSchema } from '../inputTypeSchemas/AccountWhereUniqueInputSchema'

export const AccountFindUniqueArgsSchema: z.ZodType<Omit<Prisma.AccountFindUniqueArgs, "select" | "include">> = z.object({
  where: AccountWhereUniqueInputSchema,
}).strict()

export default AccountFindUniqueArgsSchema;
