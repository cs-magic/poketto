import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { EnumPlatformTypeFilterSchema } from './EnumPlatformTypeFilterSchema';
import { PlatformTypeSchema } from './PlatformTypeSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { JsonNullableFilterSchema } from './JsonNullableFilterSchema';
import { UserRelationFilterSchema } from './UserRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { AppTagListRelationFilterSchema } from './AppTagListRelationFilterSchema';
import { AppCategoryRelationFilterSchema } from './AppCategoryRelationFilterSchema';
import { AppCategoryWhereInputSchema } from './AppCategoryWhereInputSchema';
import { AppActionListRelationFilterSchema } from './AppActionListRelationFilterSchema';
import { ConversationListRelationFilterSchema } from './ConversationListRelationFilterSchema';
import { StarringAppListRelationFilterSchema } from './StarringAppListRelationFilterSchema';
import { AppCommentListRelationFilterSchema } from './AppCommentListRelationFilterSchema';
import { AppStateNullableRelationFilterSchema } from './AppStateNullableRelationFilterSchema';
import { AppStateWhereInputSchema } from './AppStateWhereInputSchema';

export const AppWhereInputSchema: z.ZodType<Prisma.AppWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AppWhereInputSchema),z.lazy(() => AppWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppWhereInputSchema),z.lazy(() => AppWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  platformType: z.union([ z.lazy(() => EnumPlatformTypeFilterSchema),z.lazy(() => PlatformTypeSchema) ]).optional(),
  platformId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  creatorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  avatar: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  desc: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  language: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  version: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  categoryMain: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  categorySub: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  modelName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isOpenSource: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  modelArgs: z.lazy(() => JsonNullableFilterSchema).optional(),
  creator: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  tags: z.lazy(() => AppTagListRelationFilterSchema).optional(),
  category: z.union([ z.lazy(() => AppCategoryRelationFilterSchema),z.lazy(() => AppCategoryWhereInputSchema) ]).optional(),
  actions: z.lazy(() => AppActionListRelationFilterSchema).optional(),
  using: z.lazy(() => ConversationListRelationFilterSchema).optional(),
  starring: z.lazy(() => StarringAppListRelationFilterSchema).optional(),
  comments: z.lazy(() => AppCommentListRelationFilterSchema).optional(),
  state: z.union([ z.lazy(() => AppStateNullableRelationFilterSchema),z.lazy(() => AppStateWhereInputSchema) ]).optional().nullable(),
}).strict();

export default AppWhereInputSchema;
