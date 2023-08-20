import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ConversationWhereUniqueInputSchema } from '../inputTypeSchemas/ConversationWhereUniqueInputSchema'
import { ConversationCreateInputSchema } from '../inputTypeSchemas/ConversationCreateInputSchema'
import { ConversationUncheckedCreateInputSchema } from '../inputTypeSchemas/ConversationUncheckedCreateInputSchema'
import { ConversationUpdateInputSchema } from '../inputTypeSchemas/ConversationUpdateInputSchema'
import { ConversationUncheckedUpdateInputSchema } from '../inputTypeSchemas/ConversationUncheckedUpdateInputSchema'

export const ConversationUpsertArgsSchema: z.ZodType<Omit<Prisma.ConversationUpsertArgs, "select" | "include">> = z.object({
  where: ConversationWhereUniqueInputSchema,
  create: z.union([ ConversationCreateInputSchema,ConversationUncheckedCreateInputSchema ]),
  update: z.union([ ConversationUpdateInputSchema,ConversationUncheckedUpdateInputSchema ]),
}).strict()

export default ConversationUpsertArgsSchema;
