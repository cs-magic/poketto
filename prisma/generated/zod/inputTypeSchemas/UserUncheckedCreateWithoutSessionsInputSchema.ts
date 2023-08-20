import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PlatformTypeSchema } from './PlatformTypeSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValue } from './InputJsonValue';
import { AccountUncheckedCreateNestedManyWithoutUserInputSchema } from './AccountUncheckedCreateNestedManyWithoutUserInputSchema';
import { InvitationRelationUncheckedCreateNestedManyWithoutFromInputSchema } from './InvitationRelationUncheckedCreateNestedManyWithoutFromInputSchema';
import { InvitationRelationUncheckedCreateNestedManyWithoutToInputSchema } from './InvitationRelationUncheckedCreateNestedManyWithoutToInputSchema';
import { FollowRelationUncheckedCreateNestedManyWithoutFromInputSchema } from './FollowRelationUncheckedCreateNestedManyWithoutFromInputSchema';
import { FollowRelationUncheckedCreateNestedManyWithoutToInputSchema } from './FollowRelationUncheckedCreateNestedManyWithoutToInputSchema';
import { ChatMessageUncheckedCreateNestedManyWithoutUserInputSchema } from './ChatMessageUncheckedCreateNestedManyWithoutUserInputSchema';
import { ChatMessageActionUncheckedCreateNestedManyWithoutUserInputSchema } from './ChatMessageActionUncheckedCreateNestedManyWithoutUserInputSchema';
import { AppTagUncheckedCreateNestedManyWithoutCreatorInputSchema } from './AppTagUncheckedCreateNestedManyWithoutCreatorInputSchema';
import { AppCommentUncheckedCreateNestedManyWithoutUserInputSchema } from './AppCommentUncheckedCreateNestedManyWithoutUserInputSchema';
import { AppActionUncheckedCreateNestedManyWithoutUserInputSchema } from './AppActionUncheckedCreateNestedManyWithoutUserInputSchema';
import { StarringAppUncheckedCreateNestedManyWithoutUserInputSchema } from './StarringAppUncheckedCreateNestedManyWithoutUserInputSchema';
import { AppUncheckedCreateNestedManyWithoutCreatorInputSchema } from './AppUncheckedCreateNestedManyWithoutCreatorInputSchema';
import { ConversationUncheckedCreateNestedManyWithoutUserInputSchema } from './ConversationUncheckedCreateNestedManyWithoutUserInputSchema';

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
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
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUncheckedCreateNestedManyWithoutFromInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUncheckedCreateNestedManyWithoutToInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUncheckedCreateNestedManyWithoutFromInputSchema).optional(),
  following: z.lazy(() => FollowRelationUncheckedCreateNestedManyWithoutToInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  tags: z.lazy(() => AppTagUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  appActions: z.lazy(() => AppActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdApps: z.lazy(() => AppUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export default UserUncheckedCreateWithoutSessionsInputSchema;
