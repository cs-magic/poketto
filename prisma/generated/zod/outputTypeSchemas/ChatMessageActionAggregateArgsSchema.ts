import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatMessageActionWhereInputSchema } from '../inputTypeSchemas/ChatMessageActionWhereInputSchema'
import { ChatMessageActionOrderByWithRelationInputSchema } from '../inputTypeSchemas/ChatMessageActionOrderByWithRelationInputSchema'
import { ChatMessageActionWhereUniqueInputSchema } from '../inputTypeSchemas/ChatMessageActionWhereUniqueInputSchema'

export const ChatMessageActionAggregateArgsSchema: z.ZodType<Prisma.ChatMessageActionAggregateArgs> = z.object({
  where: ChatMessageActionWhereInputSchema.optional(),
  orderBy: z.union([ ChatMessageActionOrderByWithRelationInputSchema.array(),ChatMessageActionOrderByWithRelationInputSchema ]).optional(),
  cursor: ChatMessageActionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default ChatMessageActionAggregateArgsSchema;
