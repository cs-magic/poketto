import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { InvitationRelationWhereInputSchema } from './InvitationRelationWhereInputSchema';

export const InvitationRelationListRelationFilterSchema: z.ZodType<Prisma.InvitationRelationListRelationFilter> = z.object({
  every: z.lazy(() => InvitationRelationWhereInputSchema).optional(),
  some: z.lazy(() => InvitationRelationWhereInputSchema).optional(),
  none: z.lazy(() => InvitationRelationWhereInputSchema).optional()
}).strict();

export default InvitationRelationListRelationFilterSchema;
