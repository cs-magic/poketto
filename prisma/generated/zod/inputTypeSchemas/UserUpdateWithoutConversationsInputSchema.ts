import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { PlatformTypeSchema } from './PlatformTypeSchema';
import { EnumPlatformTypeFieldUpdateOperationsInputSchema } from './EnumPlatformTypeFieldUpdateOperationsInputSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValue } from './InputJsonValue';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { NullableDateTimeFieldUpdateOperationsInputSchema } from './NullableDateTimeFieldUpdateOperationsInputSchema';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { AccountUpdateManyWithoutUserNestedInputSchema } from './AccountUpdateManyWithoutUserNestedInputSchema';
import { SessionUpdateManyWithoutUserNestedInputSchema } from './SessionUpdateManyWithoutUserNestedInputSchema';
import { InvitationRelationUpdateManyWithoutFromNestedInputSchema } from './InvitationRelationUpdateManyWithoutFromNestedInputSchema';
import { InvitationRelationUpdateManyWithoutToNestedInputSchema } from './InvitationRelationUpdateManyWithoutToNestedInputSchema';
import { FollowRelationUpdateManyWithoutFromNestedInputSchema } from './FollowRelationUpdateManyWithoutFromNestedInputSchema';
import { FollowRelationUpdateManyWithoutToNestedInputSchema } from './FollowRelationUpdateManyWithoutToNestedInputSchema';
import { ChatMessageUpdateManyWithoutUserNestedInputSchema } from './ChatMessageUpdateManyWithoutUserNestedInputSchema';
import { ChatMessageActionUpdateManyWithoutUserNestedInputSchema } from './ChatMessageActionUpdateManyWithoutUserNestedInputSchema';
import { AppTagUpdateManyWithoutCreatorNestedInputSchema } from './AppTagUpdateManyWithoutCreatorNestedInputSchema';
import { AppCommentUpdateManyWithoutUserNestedInputSchema } from './AppCommentUpdateManyWithoutUserNestedInputSchema';
import { AppActionUpdateManyWithoutUserNestedInputSchema } from './AppActionUpdateManyWithoutUserNestedInputSchema';
import { StarringAppUpdateManyWithoutUserNestedInputSchema } from './StarringAppUpdateManyWithoutUserNestedInputSchema';
import { AppUpdateManyWithoutCreatorNestedInputSchema } from './AppUpdateManyWithoutCreatorNestedInputSchema';

export const UserUpdateWithoutConversationsInputSchema: z.ZodType<Prisma.UserUpdateWithoutConversationsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  desc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followedByCount: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followingCount: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUpdateManyWithoutFromNestedInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUpdateManyWithoutToNestedInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUpdateManyWithoutFromNestedInputSchema).optional(),
  following: z.lazy(() => FollowRelationUpdateManyWithoutToNestedInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUpdateManyWithoutUserNestedInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUpdateManyWithoutUserNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUpdateManyWithoutCreatorNestedInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUpdateManyWithoutUserNestedInputSchema).optional(),
  appActions: z.lazy(() => AppActionUpdateManyWithoutUserNestedInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUpdateManyWithoutUserNestedInputSchema).optional(),
  createdApps: z.lazy(() => AppUpdateManyWithoutCreatorNestedInputSchema).optional()
}).strict();

export default UserUpdateWithoutConversationsInputSchema;
