import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { VerificationTokenUpdateInputSchema } from '../inputTypeSchemas/VerificationTokenUpdateInputSchema'
import { VerificationTokenUncheckedUpdateInputSchema } from '../inputTypeSchemas/VerificationTokenUncheckedUpdateInputSchema'
import { VerificationTokenWhereUniqueInputSchema } from '../inputTypeSchemas/VerificationTokenWhereUniqueInputSchema'

export const VerificationTokenUpdateArgsSchema: z.ZodType<Omit<Prisma.VerificationTokenUpdateArgs, "select">> = z.object({
  data: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export default VerificationTokenUpdateArgsSchema;
