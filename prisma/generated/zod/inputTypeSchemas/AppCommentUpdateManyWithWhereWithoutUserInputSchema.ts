import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCommentScalarWhereInputSchema } from './AppCommentScalarWhereInputSchema';
import { AppCommentUpdateManyMutationInputSchema } from './AppCommentUpdateManyMutationInputSchema';
import { AppCommentUncheckedUpdateManyWithoutUserInputSchema } from './AppCommentUncheckedUpdateManyWithoutUserInputSchema';

export const AppCommentUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AppCommentUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AppCommentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AppCommentUpdateManyMutationInputSchema),z.lazy(() => AppCommentUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export default AppCommentUpdateManyWithWhereWithoutUserInputSchema;
