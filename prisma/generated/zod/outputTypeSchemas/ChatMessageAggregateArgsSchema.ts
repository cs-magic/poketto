import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatMessageWhereInputSchema } from '../inputTypeSchemas/ChatMessageWhereInputSchema'
import { ChatMessageOrderByWithRelationInputSchema } from '../inputTypeSchemas/ChatMessageOrderByWithRelationInputSchema'
import { ChatMessageWhereUniqueInputSchema } from '../inputTypeSchemas/ChatMessageWhereUniqueInputSchema'

export const ChatMessageAggregateArgsSchema: z.ZodType<Prisma.ChatMessageAggregateArgs> = z.object({
  where: ChatMessageWhereInputSchema.optional(),
  orderBy: z.union([ ChatMessageOrderByWithRelationInputSchema.array(),ChatMessageOrderByWithRelationInputSchema ]).optional(),
  cursor: ChatMessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default ChatMessageAggregateArgsSchema;
