import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatMessageWhereInputSchema } from '../inputTypeSchemas/ChatMessageWhereInputSchema'
import { ChatMessageOrderByWithAggregationInputSchema } from '../inputTypeSchemas/ChatMessageOrderByWithAggregationInputSchema'
import { ChatMessageScalarFieldEnumSchema } from '../inputTypeSchemas/ChatMessageScalarFieldEnumSchema'
import { ChatMessageScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/ChatMessageScalarWhereWithAggregatesInputSchema'

export const ChatMessageGroupByArgsSchema: z.ZodType<Prisma.ChatMessageGroupByArgs> = z.object({
  where: ChatMessageWhereInputSchema.optional(),
  orderBy: z.union([ ChatMessageOrderByWithAggregationInputSchema.array(),ChatMessageOrderByWithAggregationInputSchema ]).optional(),
  by: ChatMessageScalarFieldEnumSchema.array(),
  having: ChatMessageScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default ChatMessageGroupByArgsSchema;
