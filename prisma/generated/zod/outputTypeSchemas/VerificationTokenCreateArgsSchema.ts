import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { VerificationTokenCreateInputSchema } from '../inputTypeSchemas/VerificationTokenCreateInputSchema'
import { VerificationTokenUncheckedCreateInputSchema } from '../inputTypeSchemas/VerificationTokenUncheckedCreateInputSchema'

export const VerificationTokenCreateArgsSchema: z.ZodType<Omit<Prisma.VerificationTokenCreateArgs, "select">> = z.object({
  data: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
}).strict()

export default VerificationTokenCreateArgsSchema;
