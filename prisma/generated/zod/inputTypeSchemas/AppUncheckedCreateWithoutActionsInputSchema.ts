import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PlatformTypeSchema } from './PlatformTypeSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValue } from './InputJsonValue';
import { AppTagUncheckedCreateNestedManyWithoutAppsInputSchema } from './AppTagUncheckedCreateNestedManyWithoutAppsInputSchema';
import { ConversationUncheckedCreateNestedManyWithoutAppInputSchema } from './ConversationUncheckedCreateNestedManyWithoutAppInputSchema';
import { StarringAppUncheckedCreateNestedManyWithoutAppInputSchema } from './StarringAppUncheckedCreateNestedManyWithoutAppInputSchema';
import { AppCommentUncheckedCreateNestedManyWithoutAAppInputSchema } from './AppCommentUncheckedCreateNestedManyWithoutAAppInputSchema';
import { AppStateUncheckedCreateNestedOneWithoutAppInputSchema } from './AppStateUncheckedCreateNestedOneWithoutAppInputSchema';

export const AppUncheckedCreateWithoutActionsInputSchema: z.ZodType<Prisma.AppUncheckedCreateWithoutActionsInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  creatorId: z.string(),
  name: z.string(),
  avatar: z.string(),
  desc: z.string(),
  language: z.string().optional(),
  version: z.string().optional(),
  categoryMain: z.number(),
  categorySub: z.number(),
  modelName: z.string(),
  isOpenSource: z.boolean().optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  tags: z.lazy(() => AppTagUncheckedCreateNestedManyWithoutAppsInputSchema).optional(),
  using: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutAppInputSchema).optional(),
  starring: z.lazy(() => StarringAppUncheckedCreateNestedManyWithoutAppInputSchema).optional(),
  comments: z.lazy(() => AppCommentUncheckedCreateNestedManyWithoutAAppInputSchema).optional(),
  state: z.lazy(() => AppStateUncheckedCreateNestedOneWithoutAppInputSchema).optional()
}).strict();

export default AppUncheckedCreateWithoutActionsInputSchema;
