import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { AppTagFindManyArgsSchema } from "../outputTypeSchemas/AppTagFindManyArgsSchema"
import { AppCategoryArgsSchema } from "../outputTypeSchemas/AppCategoryArgsSchema"
import { AppActionFindManyArgsSchema } from "../outputTypeSchemas/AppActionFindManyArgsSchema"
import { ConversationFindManyArgsSchema } from "../outputTypeSchemas/ConversationFindManyArgsSchema"
import { StarringAppFindManyArgsSchema } from "../outputTypeSchemas/StarringAppFindManyArgsSchema"
import { AppCommentFindManyArgsSchema } from "../outputTypeSchemas/AppCommentFindManyArgsSchema"
import { AppStateArgsSchema } from "../outputTypeSchemas/AppStateArgsSchema"
import { AppCountOutputTypeArgsSchema } from "../outputTypeSchemas/AppCountOutputTypeArgsSchema"

export const AppIncludeSchema: z.ZodType<Prisma.AppInclude> = z.object({
  creator: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => AppTagFindManyArgsSchema)]).optional(),
  category: z.union([z.boolean(),z.lazy(() => AppCategoryArgsSchema)]).optional(),
  actions: z.union([z.boolean(),z.lazy(() => AppActionFindManyArgsSchema)]).optional(),
  using: z.union([z.boolean(),z.lazy(() => ConversationFindManyArgsSchema)]).optional(),
  starring: z.union([z.boolean(),z.lazy(() => StarringAppFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => AppCommentFindManyArgsSchema)]).optional(),
  state: z.union([z.boolean(),z.lazy(() => AppStateArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AppCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default AppIncludeSchema;
