import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ConversationWhereInputSchema } from '../inputTypeSchemas/ConversationWhereInputSchema'
import { ConversationOrderByWithRelationInputSchema } from '../inputTypeSchemas/ConversationOrderByWithRelationInputSchema'
import { ConversationWhereUniqueInputSchema } from '../inputTypeSchemas/ConversationWhereUniqueInputSchema'
import { ConversationScalarFieldEnumSchema } from '../inputTypeSchemas/ConversationScalarFieldEnumSchema'

export const ConversationFindFirstOrThrowArgsSchema: z.ZodType<Omit<Prisma.ConversationFindFirstOrThrowArgs, "select" | "include">> = z.object({
  where: ConversationWhereInputSchema.optional(),
  orderBy: z.union([ ConversationOrderByWithRelationInputSchema.array(),ConversationOrderByWithRelationInputSchema ]).optional(),
  cursor: ConversationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ConversationScalarFieldEnumSchema,ConversationScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export default ConversationFindFirstOrThrowArgsSchema;
