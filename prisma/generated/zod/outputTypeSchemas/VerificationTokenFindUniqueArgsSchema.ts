import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { VerificationTokenWhereUniqueInputSchema } from '../inputTypeSchemas/VerificationTokenWhereUniqueInputSchema'

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<Omit<Prisma.VerificationTokenFindUniqueArgs, "select">> = z.object({
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export default VerificationTokenFindUniqueArgsSchema;
