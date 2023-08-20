import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { PlatformTypeSchema } from './PlatformTypeSchema';
import { EnumPlatformTypeFieldUpdateOperationsInputSchema } from './EnumPlatformTypeFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { BoolFieldUpdateOperationsInputSchema } from './BoolFieldUpdateOperationsInputSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValue } from './InputJsonValue';
import { UserUpdateOneRequiredWithoutCreatedAppsNestedInputSchema } from './UserUpdateOneRequiredWithoutCreatedAppsNestedInputSchema';
import { AppTagUpdateManyWithoutAppsNestedInputSchema } from './AppTagUpdateManyWithoutAppsNestedInputSchema';
import { AppCategoryUpdateOneRequiredWithoutAppNestedInputSchema } from './AppCategoryUpdateOneRequiredWithoutAppNestedInputSchema';
import { ConversationUpdateManyWithoutAppNestedInputSchema } from './ConversationUpdateManyWithoutAppNestedInputSchema';
import { StarringAppUpdateManyWithoutAppNestedInputSchema } from './StarringAppUpdateManyWithoutAppNestedInputSchema';
import { AppCommentUpdateManyWithoutAAppNestedInputSchema } from './AppCommentUpdateManyWithoutAAppNestedInputSchema';
import { AppStateUpdateOneWithoutAppNestedInputSchema } from './AppStateUpdateOneWithoutAppNestedInputSchema';

export const AppUpdateWithoutActionsInputSchema: z.ZodType<Prisma.AppUpdateWithoutActionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modelName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isOpenSource: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  creator: z.lazy(() => UserUpdateOneRequiredWithoutCreatedAppsNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUpdateManyWithoutAppsNestedInputSchema).optional(),
  category: z.lazy(() => AppCategoryUpdateOneRequiredWithoutAppNestedInputSchema).optional(),
  using: z.lazy(() => ConversationUpdateManyWithoutAppNestedInputSchema).optional(),
  starring: z.lazy(() => StarringAppUpdateManyWithoutAppNestedInputSchema).optional(),
  comments: z.lazy(() => AppCommentUpdateManyWithoutAAppNestedInputSchema).optional(),
  state: z.lazy(() => AppStateUpdateOneWithoutAppNestedInputSchema).optional()
}).strict();

export default AppUpdateWithoutActionsInputSchema;
