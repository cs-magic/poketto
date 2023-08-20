import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { IntNullableFilterSchema } from './IntNullableFilterSchema';

export const AppCommentScalarWhereInputSchema: z.ZodType<Prisma.AppCommentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AppCommentScalarWhereInputSchema),z.lazy(() => AppCommentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppCommentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppCommentScalarWhereInputSchema),z.lazy(() => AppCommentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  appId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rate: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export default AppCommentScalarWhereInputSchema;
