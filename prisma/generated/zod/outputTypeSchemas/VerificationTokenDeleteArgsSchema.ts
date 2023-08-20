import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { VerificationTokenWhereUniqueInputSchema } from '../inputTypeSchemas/VerificationTokenWhereUniqueInputSchema'

export const VerificationTokenDeleteArgsSchema: z.ZodType<Omit<Prisma.VerificationTokenDeleteArgs, "select">> = z.object({
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export default VerificationTokenDeleteArgsSchema;
