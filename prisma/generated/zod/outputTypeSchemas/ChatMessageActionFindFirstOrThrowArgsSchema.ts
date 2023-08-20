import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatMessageActionWhereInputSchema } from '../inputTypeSchemas/ChatMessageActionWhereInputSchema'
import { ChatMessageActionOrderByWithRelationInputSchema } from '../inputTypeSchemas/ChatMessageActionOrderByWithRelationInputSchema'
import { ChatMessageActionWhereUniqueInputSchema } from '../inputTypeSchemas/ChatMessageActionWhereUniqueInputSchema'
import { ChatMessageActionScalarFieldEnumSchema } from '../inputTypeSchemas/ChatMessageActionScalarFieldEnumSchema'

export const ChatMessageActionFindFirstOrThrowArgsSchema: z.ZodType<Omit<Prisma.ChatMessageActionFindFirstOrThrowArgs, "select" | "include">> = z.object({
  where: ChatMessageActionWhereInputSchema.optional(),
  orderBy: z.union([ ChatMessageActionOrderByWithRelationInputSchema.array(),ChatMessageActionOrderByWithRelationInputSchema ]).optional(),
  cursor: ChatMessageActionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ChatMessageActionScalarFieldEnumSchema,ChatMessageActionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export default ChatMessageActionFindFirstOrThrowArgsSchema;
