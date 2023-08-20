import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AccountFindManyArgsSchema } from "../outputTypeSchemas/AccountFindManyArgsSchema"
import { SessionFindManyArgsSchema } from "../outputTypeSchemas/SessionFindManyArgsSchema"
import { InvitationRelationFindManyArgsSchema } from "../outputTypeSchemas/InvitationRelationFindManyArgsSchema"
import { FollowRelationFindManyArgsSchema } from "../outputTypeSchemas/FollowRelationFindManyArgsSchema"
import { ChatMessageFindManyArgsSchema } from "../outputTypeSchemas/ChatMessageFindManyArgsSchema"
import { ChatMessageActionFindManyArgsSchema } from "../outputTypeSchemas/ChatMessageActionFindManyArgsSchema"
import { AppTagFindManyArgsSchema } from "../outputTypeSchemas/AppTagFindManyArgsSchema"
import { AppCommentFindManyArgsSchema } from "../outputTypeSchemas/AppCommentFindManyArgsSchema"
import { AppActionFindManyArgsSchema } from "../outputTypeSchemas/AppActionFindManyArgsSchema"
import { StarringAppFindManyArgsSchema } from "../outputTypeSchemas/StarringAppFindManyArgsSchema"
import { AppFindManyArgsSchema } from "../outputTypeSchemas/AppFindManyArgsSchema"
import { ConversationFindManyArgsSchema } from "../outputTypeSchemas/ConversationFindManyArgsSchema"
import { UserCountOutputTypeArgsSchema } from "../outputTypeSchemas/UserCountOutputTypeArgsSchema"

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  platformType: z.boolean().optional(),
  platformId: z.boolean().optional(),
  platformArgs: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  desc: z.boolean().optional(),
  balance: z.boolean().optional(),
  followedByCount: z.boolean().optional(),
  followingCount: z.boolean().optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  invitedFrom: z.union([z.boolean(),z.lazy(() => InvitationRelationFindManyArgsSchema)]).optional(),
  invitedTo: z.union([z.boolean(),z.lazy(() => InvitationRelationFindManyArgsSchema)]).optional(),
  followedBy: z.union([z.boolean(),z.lazy(() => FollowRelationFindManyArgsSchema)]).optional(),
  following: z.union([z.boolean(),z.lazy(() => FollowRelationFindManyArgsSchema)]).optional(),
  chatMessages: z.union([z.boolean(),z.lazy(() => ChatMessageFindManyArgsSchema)]).optional(),
  chatMessageActions: z.union([z.boolean(),z.lazy(() => ChatMessageActionFindManyArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => AppTagFindManyArgsSchema)]).optional(),
  appComments: z.union([z.boolean(),z.lazy(() => AppCommentFindManyArgsSchema)]).optional(),
  appActions: z.union([z.boolean(),z.lazy(() => AppActionFindManyArgsSchema)]).optional(),
  StarringApp: z.union([z.boolean(),z.lazy(() => StarringAppFindManyArgsSchema)]).optional(),
  createdApps: z.union([z.boolean(),z.lazy(() => AppFindManyArgsSchema)]).optional(),
  conversations: z.union([z.boolean(),z.lazy(() => ConversationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default UserSelectSchema;
