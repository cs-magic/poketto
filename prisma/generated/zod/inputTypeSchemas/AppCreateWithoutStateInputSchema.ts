import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PlatformTypeSchema } from './PlatformTypeSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValue } from './InputJsonValue';
import { UserCreateNestedOneWithoutCreatedAppsInputSchema } from './UserCreateNestedOneWithoutCreatedAppsInputSchema';
import { AppTagCreateNestedManyWithoutAppsInputSchema } from './AppTagCreateNestedManyWithoutAppsInputSchema';
import { AppCategoryCreateNestedOneWithoutAppInputSchema } from './AppCategoryCreateNestedOneWithoutAppInputSchema';
import { AppActionCreateNestedManyWithoutAppInputSchema } from './AppActionCreateNestedManyWithoutAppInputSchema';
import { ConversationCreateNestedManyWithoutAppInputSchema } from './ConversationCreateNestedManyWithoutAppInputSchema';
import { StarringAppCreateNestedManyWithoutAppInputSchema } from './StarringAppCreateNestedManyWithoutAppInputSchema';
import { AppCommentCreateNestedManyWithoutAAppInputSchema } from './AppCommentCreateNestedManyWithoutAAppInputSchema';

export const AppCreateWithoutStateInputSchema: z.ZodType<Prisma.AppCreateWithoutStateInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  name: z.string(),
  avatar: z.string(),
  desc: z.string(),
  language: z.string().optional(),
  version: z.string().optional(),
  modelName: z.string(),
  isOpenSource: z.boolean().optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  creator: z.lazy(() => UserCreateNestedOneWithoutCreatedAppsInputSchema),
  tags: z.lazy(() => AppTagCreateNestedManyWithoutAppsInputSchema).optional(),
  category: z.lazy(() => AppCategoryCreateNestedOneWithoutAppInputSchema),
  actions: z.lazy(() => AppActionCreateNestedManyWithoutAppInputSchema).optional(),
  using: z.lazy(() => ConversationCreateNestedManyWithoutAppInputSchema).optional(),
  starring: z.lazy(() => StarringAppCreateNestedManyWithoutAppInputSchema).optional(),
  comments: z.lazy(() => AppCommentCreateNestedManyWithoutAAppInputSchema).optional()
}).strict();

export default AppCreateWithoutStateInputSchema;
