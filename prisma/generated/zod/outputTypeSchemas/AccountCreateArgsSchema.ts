import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AccountCreateInputSchema } from '../inputTypeSchemas/AccountCreateInputSchema'
import { AccountUncheckedCreateInputSchema } from '../inputTypeSchemas/AccountUncheckedCreateInputSchema'

export const AccountCreateArgsSchema: z.ZodType<Omit<Prisma.AccountCreateArgs, "select" | "include">> = z.object({
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict()

export default AccountCreateArgsSchema;
