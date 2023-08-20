import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { PlatformTypeSchema } from './PlatformTypeSchema';
import { EnumPlatformTypeFieldUpdateOperationsInputSchema } from './EnumPlatformTypeFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { BoolFieldUpdateOperationsInputSchema } from './BoolFieldUpdateOperationsInputSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValue } from './InputJsonValue';
import { AppTagUncheckedUpdateManyWithoutAppsNestedInputSchema } from './AppTagUncheckedUpdateManyWithoutAppsNestedInputSchema';
import { AppActionUncheckedUpdateManyWithoutAppNestedInputSchema } from './AppActionUncheckedUpdateManyWithoutAppNestedInputSchema';
import { ConversationUncheckedUpdateManyWithoutAppNestedInputSchema } from './ConversationUncheckedUpdateManyWithoutAppNestedInputSchema';
import { StarringAppUncheckedUpdateManyWithoutAppNestedInputSchema } from './StarringAppUncheckedUpdateManyWithoutAppNestedInputSchema';
import { AppCommentUncheckedUpdateManyWithoutAAppNestedInputSchema } from './AppCommentUncheckedUpdateManyWithoutAAppNestedInputSchema';
import { AppStateUncheckedUpdateOneWithoutAppNestedInputSchema } from './AppStateUncheckedUpdateOneWithoutAppNestedInputSchema';

export const AppUncheckedUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.AppUncheckedUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  creatorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modelName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isOpenSource: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  tags: z.lazy(() => AppTagUncheckedUpdateManyWithoutAppsNestedInputSchema).optional(),
  actions: z.lazy(() => AppActionUncheckedUpdateManyWithoutAppNestedInputSchema).optional(),
  using: z.lazy(() => ConversationUncheckedUpdateManyWithoutAppNestedInputSchema).optional(),
  starring: z.lazy(() => StarringAppUncheckedUpdateManyWithoutAppNestedInputSchema).optional(),
  comments: z.lazy(() => AppCommentUncheckedUpdateManyWithoutAAppNestedInputSchema).optional(),
  state: z.lazy(() => AppStateUncheckedUpdateOneWithoutAppNestedInputSchema).optional()
}).strict();

export default AppUncheckedUpdateWithoutCategoryInputSchema;
