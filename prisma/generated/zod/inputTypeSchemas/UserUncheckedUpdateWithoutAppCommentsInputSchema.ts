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
import { AccountUncheckedUpdateManyWithoutUserNestedInputSchema } from './AccountUncheckedUpdateManyWithoutUserNestedInputSchema';
import { SessionUncheckedUpdateManyWithoutUserNestedInputSchema } from './SessionUncheckedUpdateManyWithoutUserNestedInputSchema';
import { InvitationRelationUncheckedUpdateManyWithoutFromNestedInputSchema } from './InvitationRelationUncheckedUpdateManyWithoutFromNestedInputSchema';
import { InvitationRelationUncheckedUpdateManyWithoutToNestedInputSchema } from './InvitationRelationUncheckedUpdateManyWithoutToNestedInputSchema';
import { FollowRelationUncheckedUpdateManyWithoutFromNestedInputSchema } from './FollowRelationUncheckedUpdateManyWithoutFromNestedInputSchema';
import { FollowRelationUncheckedUpdateManyWithoutToNestedInputSchema } from './FollowRelationUncheckedUpdateManyWithoutToNestedInputSchema';
import { ChatMessageUncheckedUpdateManyWithoutUserNestedInputSchema } from './ChatMessageUncheckedUpdateManyWithoutUserNestedInputSchema';
import { ChatMessageActionUncheckedUpdateManyWithoutUserNestedInputSchema } from './ChatMessageActionUncheckedUpdateManyWithoutUserNestedInputSchema';
import { AppTagUncheckedUpdateManyWithoutCreatorNestedInputSchema } from './AppTagUncheckedUpdateManyWithoutCreatorNestedInputSchema';
import { AppActionUncheckedUpdateManyWithoutUserNestedInputSchema } from './AppActionUncheckedUpdateManyWithoutUserNestedInputSchema';
import { StarringAppUncheckedUpdateManyWithoutUserNestedInputSchema } from './StarringAppUncheckedUpdateManyWithoutUserNestedInputSchema';
import { AppUncheckedUpdateManyWithoutCreatorNestedInputSchema } from './AppUncheckedUpdateManyWithoutCreatorNestedInputSchema';
import { ConversationUncheckedUpdateManyWithoutUserNestedInputSchema } from './ConversationUncheckedUpdateManyWithoutUserNestedInputSchema';

export const UserUncheckedUpdateWithoutAppCommentsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAppCommentsInput> = z.object({
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
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutFromNestedInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutToNestedInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUncheckedUpdateManyWithoutFromNestedInputSchema).optional(),
  following: z.lazy(() => FollowRelationUncheckedUpdateManyWithoutToNestedInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  appActions: z.lazy(() => AppActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdApps: z.lazy(() => AppUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export default UserUncheckedUpdateWithoutAppCommentsInputSchema;
