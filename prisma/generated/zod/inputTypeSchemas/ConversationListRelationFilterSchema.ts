import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ConversationWhereInputSchema } from './ConversationWhereInputSchema';

export const ConversationListRelationFilterSchema: z.ZodType<Prisma.ConversationListRelationFilter> = z.object({
  every: z.lazy(() => ConversationWhereInputSchema).optional(),
  some: z.lazy(() => ConversationWhereInputSchema).optional(),
  none: z.lazy(() => ConversationWhereInputSchema).optional()
}).strict();

export default ConversationListRelationFilterSchema;
