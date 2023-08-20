import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { VerificationTokenWhereInputSchema } from '../inputTypeSchemas/VerificationTokenWhereInputSchema'
import { VerificationTokenOrderByWithRelationInputSchema } from '../inputTypeSchemas/VerificationTokenOrderByWithRelationInputSchema'
import { VerificationTokenWhereUniqueInputSchema } from '../inputTypeSchemas/VerificationTokenWhereUniqueInputSchema'
import { VerificationTokenScalarFieldEnumSchema } from '../inputTypeSchemas/VerificationTokenScalarFieldEnumSchema'

export const VerificationTokenFindManyArgsSchema: z.ZodType<Omit<Prisma.VerificationTokenFindManyArgs, "select">> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export default VerificationTokenFindManyArgsSchema;
