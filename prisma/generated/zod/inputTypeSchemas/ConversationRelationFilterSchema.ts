import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ConversationWhereInputSchema } from './ConversationWhereInputSchema';

export const ConversationRelationFilterSchema: z.ZodType<Prisma.ConversationRelationFilter> = z.object({
  is: z.lazy(() => ConversationWhereInputSchema).optional(),
  isNot: z.lazy(() => ConversationWhereInputSchema).optional()
}).strict();

export default ConversationRelationFilterSchema;
