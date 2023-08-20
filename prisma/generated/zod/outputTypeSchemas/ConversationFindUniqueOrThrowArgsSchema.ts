import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ConversationWhereUniqueInputSchema } from '../inputTypeSchemas/ConversationWhereUniqueInputSchema'

export const ConversationFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.ConversationFindUniqueOrThrowArgs, "select" | "include">> = z.object({
  where: ConversationWhereUniqueInputSchema,
}).strict()

export default ConversationFindUniqueOrThrowArgsSchema;
