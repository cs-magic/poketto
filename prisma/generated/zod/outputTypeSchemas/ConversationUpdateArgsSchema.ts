import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ConversationUpdateInputSchema } from '../inputTypeSchemas/ConversationUpdateInputSchema'
import { ConversationUncheckedUpdateInputSchema } from '../inputTypeSchemas/ConversationUncheckedUpdateInputSchema'
import { ConversationWhereUniqueInputSchema } from '../inputTypeSchemas/ConversationWhereUniqueInputSchema'

export const ConversationUpdateArgsSchema: z.ZodType<Omit<Prisma.ConversationUpdateArgs, "select" | "include">> = z.object({
  data: z.union([ ConversationUpdateInputSchema,ConversationUncheckedUpdateInputSchema ]),
  where: ConversationWhereUniqueInputSchema,
}).strict()

export default ConversationUpdateArgsSchema;
