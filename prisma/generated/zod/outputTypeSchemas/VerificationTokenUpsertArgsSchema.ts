import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { VerificationTokenWhereUniqueInputSchema } from '../inputTypeSchemas/VerificationTokenWhereUniqueInputSchema'
import { VerificationTokenCreateInputSchema } from '../inputTypeSchemas/VerificationTokenCreateInputSchema'
import { VerificationTokenUncheckedCreateInputSchema } from '../inputTypeSchemas/VerificationTokenUncheckedCreateInputSchema'
import { VerificationTokenUpdateInputSchema } from '../inputTypeSchemas/VerificationTokenUpdateInputSchema'
import { VerificationTokenUncheckedUpdateInputSchema } from '../inputTypeSchemas/VerificationTokenUncheckedUpdateInputSchema'

export const VerificationTokenUpsertArgsSchema: z.ZodType<Omit<Prisma.VerificationTokenUpsertArgs, "select">> = z.object({
  where: VerificationTokenWhereUniqueInputSchema,
  create: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
  update: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
}).strict()

export default VerificationTokenUpsertArgsSchema;
