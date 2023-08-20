import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AccountWhereUniqueInputSchema } from '../inputTypeSchemas/AccountWhereUniqueInputSchema'

export const AccountDeleteArgsSchema: z.ZodType<Omit<Prisma.AccountDeleteArgs, "select" | "include">> = z.object({
  where: AccountWhereUniqueInputSchema,
}).strict()

export default AccountDeleteArgsSchema;
