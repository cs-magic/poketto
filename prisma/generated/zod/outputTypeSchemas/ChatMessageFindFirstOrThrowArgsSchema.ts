import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatMessageWhereInputSchema } from '../inputTypeSchemas/ChatMessageWhereInputSchema'
import { ChatMessageOrderByWithRelationInputSchema } from '../inputTypeSchemas/ChatMessageOrderByWithRelationInputSchema'
import { ChatMessageWhereUniqueInputSchema } from '../inputTypeSchemas/ChatMessageWhereUniqueInputSchema'
import { ChatMessageScalarFieldEnumSchema } from '../inputTypeSchemas/ChatMessageScalarFieldEnumSchema'

export const ChatMessageFindFirstOrThrowArgsSchema: z.ZodType<Omit<Prisma.ChatMessageFindFirstOrThrowArgs, "select" | "include">> = z.object({
  where: ChatMessageWhereInputSchema.optional(),
  orderBy: z.union([ ChatMessageOrderByWithRelationInputSchema.array(),ChatMessageOrderByWithRelationInputSchema ]).optional(),
  cursor: ChatMessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ChatMessageScalarFieldEnumSchema,ChatMessageScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export default ChatMessageFindFirstOrThrowArgsSchema;
