import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ConversationWhereUniqueInputSchema } from '../inputTypeSchemas/ConversationWhereUniqueInputSchema'

export const ConversationFindUniqueArgsSchema: z.ZodType<Omit<Prisma.ConversationFindUniqueArgs, "select" | "include">> = z.object({
  where: ConversationWhereUniqueInputSchema,
}).strict()

export default ConversationFindUniqueArgsSchema;
