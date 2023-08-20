import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AccountUpdateInputSchema } from '../inputTypeSchemas/AccountUpdateInputSchema'
import { AccountUncheckedUpdateInputSchema } from '../inputTypeSchemas/AccountUncheckedUpdateInputSchema'
import { AccountWhereUniqueInputSchema } from '../inputTypeSchemas/AccountWhereUniqueInputSchema'

export const AccountUpdateArgsSchema: z.ZodType<Omit<Prisma.AccountUpdateArgs, "select" | "include">> = z.object({
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict()

export default AccountUpdateArgsSchema;
