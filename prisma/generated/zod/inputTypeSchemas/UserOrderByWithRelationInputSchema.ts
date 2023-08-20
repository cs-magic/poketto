import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { AccountOrderByRelationAggregateInputSchema } from './AccountOrderByRelationAggregateInputSchema';
import { SessionOrderByRelationAggregateInputSchema } from './SessionOrderByRelationAggregateInputSchema';
import { InvitationRelationOrderByRelationAggregateInputSchema } from './InvitationRelationOrderByRelationAggregateInputSchema';
import { FollowRelationOrderByRelationAggregateInputSchema } from './FollowRelationOrderByRelationAggregateInputSchema';
import { ChatMessageOrderByRelationAggregateInputSchema } from './ChatMessageOrderByRelationAggregateInputSchema';
import { ChatMessageActionOrderByRelationAggregateInputSchema } from './ChatMessageActionOrderByRelationAggregateInputSchema';
import { AppTagOrderByRelationAggregateInputSchema } from './AppTagOrderByRelationAggregateInputSchema';
import { AppCommentOrderByRelationAggregateInputSchema } from './AppCommentOrderByRelationAggregateInputSchema';
import { AppActionOrderByRelationAggregateInputSchema } from './AppActionOrderByRelationAggregateInputSchema';
import { StarringAppOrderByRelationAggregateInputSchema } from './StarringAppOrderByRelationAggregateInputSchema';
import { AppOrderByRelationAggregateInputSchema } from './AppOrderByRelationAggregateInputSchema';
import { ConversationOrderByRelationAggregateInputSchema } from './ConversationOrderByRelationAggregateInputSchema';

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  platformType: z.lazy(() => SortOrderSchema).optional(),
  platformId: z.lazy(() => SortOrderSchema).optional(),
  platformArgs: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  desc: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
  followedByCount: z.lazy(() => SortOrderSchema).optional(),
  followingCount: z.lazy(() => SortOrderSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationOrderByRelationAggregateInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationOrderByRelationAggregateInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationOrderByRelationAggregateInputSchema).optional(),
  following: z.lazy(() => FollowRelationOrderByRelationAggregateInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageOrderByRelationAggregateInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionOrderByRelationAggregateInputSchema).optional(),
  tags: z.lazy(() => AppTagOrderByRelationAggregateInputSchema).optional(),
  appComments: z.lazy(() => AppCommentOrderByRelationAggregateInputSchema).optional(),
  appActions: z.lazy(() => AppActionOrderByRelationAggregateInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppOrderByRelationAggregateInputSchema).optional(),
  createdApps: z.lazy(() => AppOrderByRelationAggregateInputSchema).optional(),
  conversations: z.lazy(() => ConversationOrderByRelationAggregateInputSchema).optional()
}).strict();

export default UserOrderByWithRelationInputSchema;
