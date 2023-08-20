import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ConversationWhereUniqueInputSchema } from '../inputTypeSchemas/ConversationWhereUniqueInputSchema'

export const ConversationDeleteArgsSchema: z.ZodType<Omit<Prisma.ConversationDeleteArgs, "select" | "include">> = z.object({
  where: ConversationWhereUniqueInputSchema,
}).strict()

export default ConversationDeleteArgsSchema;
