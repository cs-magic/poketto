import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ConversationCreateInputSchema } from '../inputTypeSchemas/ConversationCreateInputSchema'
import { ConversationUncheckedCreateInputSchema } from '../inputTypeSchemas/ConversationUncheckedCreateInputSchema'

export const ConversationCreateArgsSchema: z.ZodType<Omit<Prisma.ConversationCreateArgs, "select" | "include">> = z.object({
  data: z.union([ ConversationCreateInputSchema,ConversationUncheckedCreateInputSchema ]),
}).strict()

export default ConversationCreateArgsSchema;
