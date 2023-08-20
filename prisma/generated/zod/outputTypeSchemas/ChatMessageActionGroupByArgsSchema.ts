import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatMessageActionWhereInputSchema } from '../inputTypeSchemas/ChatMessageActionWhereInputSchema'
import { ChatMessageActionOrderByWithAggregationInputSchema } from '../inputTypeSchemas/ChatMessageActionOrderByWithAggregationInputSchema'
import { ChatMessageActionScalarFieldEnumSchema } from '../inputTypeSchemas/ChatMessageActionScalarFieldEnumSchema'
import { ChatMessageActionScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/ChatMessageActionScalarWhereWithAggregatesInputSchema'

export const ChatMessageActionGroupByArgsSchema: z.ZodType<Prisma.ChatMessageActionGroupByArgs> = z.object({
  where: ChatMessageActionWhereInputSchema.optional(),
  orderBy: z.union([ ChatMessageActionOrderByWithAggregationInputSchema.array(),ChatMessageActionOrderByWithAggregationInputSchema ]).optional(),
  by: ChatMessageActionScalarFieldEnumSchema.array(),
  having: ChatMessageActionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default ChatMessageActionGroupByArgsSchema;
