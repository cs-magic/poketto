import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { EnumPlatformTypeFilterSchema } from './EnumPlatformTypeFilterSchema';
import { PlatformTypeSchema } from './PlatformTypeSchema';
import { JsonNullableFilterSchema } from './JsonNullableFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { AccountListRelationFilterSchema } from './AccountListRelationFilterSchema';
import { SessionListRelationFilterSchema } from './SessionListRelationFilterSchema';
import { InvitationRelationListRelationFilterSchema } from './InvitationRelationListRelationFilterSchema';
import { FollowRelationListRelationFilterSchema } from './FollowRelationListRelationFilterSchema';
import { ChatMessageListRelationFilterSchema } from './ChatMessageListRelationFilterSchema';
import { ChatMessageActionListRelationFilterSchema } from './ChatMessageActionListRelationFilterSchema';
import { AppTagListRelationFilterSchema } from './AppTagListRelationFilterSchema';
import { AppCommentListRelationFilterSchema } from './AppCommentListRelationFilterSchema';
import { AppActionListRelationFilterSchema } from './AppActionListRelationFilterSchema';
import { StarringAppListRelationFilterSchema } from './StarringAppListRelationFilterSchema';
import { AppListRelationFilterSchema } from './AppListRelationFilterSchema';
import { ConversationListRelationFilterSchema } from './ConversationListRelationFilterSchema';

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  platformType: z.union([ z.lazy(() => EnumPlatformTypeFilterSchema),z.lazy(() => PlatformTypeSchema) ]).optional(),
  platformId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  platformArgs: z.lazy(() => JsonNullableFilterSchema).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  desc: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  balance: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  followedByCount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  followingCount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationListRelationFilterSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationListRelationFilterSchema).optional(),
  followedBy: z.lazy(() => FollowRelationListRelationFilterSchema).optional(),
  following: z.lazy(() => FollowRelationListRelationFilterSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageListRelationFilterSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionListRelationFilterSchema).optional(),
  tags: z.lazy(() => AppTagListRelationFilterSchema).optional(),
  appComments: z.lazy(() => AppCommentListRelationFilterSchema).optional(),
  appActions: z.lazy(() => AppActionListRelationFilterSchema).optional(),
  StarringApp: z.lazy(() => StarringAppListRelationFilterSchema).optional(),
  createdApps: z.lazy(() => AppListRelationFilterSchema).optional(),
  conversations: z.lazy(() => ConversationListRelationFilterSchema).optional()
}).strict();

export default UserWhereInputSchema;
