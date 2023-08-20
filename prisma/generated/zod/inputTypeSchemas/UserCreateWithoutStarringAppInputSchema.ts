import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PlatformTypeSchema } from './PlatformTypeSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValue } from './InputJsonValue';
import { AccountCreateNestedManyWithoutUserInputSchema } from './AccountCreateNestedManyWithoutUserInputSchema';
import { SessionCreateNestedManyWithoutUserInputSchema } from './SessionCreateNestedManyWithoutUserInputSchema';
import { InvitationRelationCreateNestedManyWithoutFromInputSchema } from './InvitationRelationCreateNestedManyWithoutFromInputSchema';
import { InvitationRelationCreateNestedManyWithoutToInputSchema } from './InvitationRelationCreateNestedManyWithoutToInputSchema';
import { FollowRelationCreateNestedManyWithoutFromInputSchema } from './FollowRelationCreateNestedManyWithoutFromInputSchema';
import { FollowRelationCreateNestedManyWithoutToInputSchema } from './FollowRelationCreateNestedManyWithoutToInputSchema';
import { ChatMessageCreateNestedManyWithoutUserInputSchema } from './ChatMessageCreateNestedManyWithoutUserInputSchema';
import { ChatMessageActionCreateNestedManyWithoutUserInputSchema } from './ChatMessageActionCreateNestedManyWithoutUserInputSchema';
import { AppTagCreateNestedManyWithoutCreatorInputSchema } from './AppTagCreateNestedManyWithoutCreatorInputSchema';
import { AppCommentCreateNestedManyWithoutUserInputSchema } from './AppCommentCreateNestedManyWithoutUserInputSchema';
import { AppActionCreateNestedManyWithoutUserInputSchema } from './AppActionCreateNestedManyWithoutUserInputSchema';
import { AppCreateNestedManyWithoutCreatorInputSchema } from './AppCreateNestedManyWithoutCreatorInputSchema';
import { ConversationCreateNestedManyWithoutUserInputSchema } from './ConversationCreateNestedManyWithoutUserInputSchema';

export const UserCreateWithoutStarringAppInputSchema: z.ZodType<Prisma.UserCreateWithoutStarringAppInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.date().optional().nullable(),
  image: z.string().optional().nullable(),
  desc: z.string().optional().nullable(),
  balance: z.number().optional(),
  followedByCount: z.number().optional(),
  followingCount: z.number().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationCreateNestedManyWithoutFromInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationCreateNestedManyWithoutToInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationCreateNestedManyWithoutFromInputSchema).optional(),
  following: z.lazy(() => FollowRelationCreateNestedManyWithoutToInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageCreateNestedManyWithoutUserInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionCreateNestedManyWithoutUserInputSchema).optional(),
  tags: z.lazy(() => AppTagCreateNestedManyWithoutCreatorInputSchema).optional(),
  appComments: z.lazy(() => AppCommentCreateNestedManyWithoutUserInputSchema).optional(),
  appActions: z.lazy(() => AppActionCreateNestedManyWithoutUserInputSchema).optional(),
  createdApps: z.lazy(() => AppCreateNestedManyWithoutCreatorInputSchema).optional(),
  conversations: z.lazy(() => ConversationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export default UserCreateWithoutStarringAppInputSchema;
