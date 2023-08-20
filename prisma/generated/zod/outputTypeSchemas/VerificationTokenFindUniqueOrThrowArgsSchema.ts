import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { VerificationTokenWhereUniqueInputSchema } from '../inputTypeSchemas/VerificationTokenWhereUniqueInputSchema'

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.VerificationTokenFindUniqueOrThrowArgs, "select">> = z.object({
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export default VerificationTokenFindUniqueOrThrowArgsSchema;
