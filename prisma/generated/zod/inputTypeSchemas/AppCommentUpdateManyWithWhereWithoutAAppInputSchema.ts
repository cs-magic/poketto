import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCommentScalarWhereInputSchema } from './AppCommentScalarWhereInputSchema';
import { AppCommentUpdateManyMutationInputSchema } from './AppCommentUpdateManyMutationInputSchema';
import { AppCommentUncheckedUpdateManyWithoutAAppInputSchema } from './AppCommentUncheckedUpdateManyWithoutAAppInputSchema';

export const AppCommentUpdateManyWithWhereWithoutAAppInputSchema: z.ZodType<Prisma.AppCommentUpdateManyWithWhereWithoutAAppInput> = z.object({
  where: z.lazy(() => AppCommentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AppCommentUpdateManyMutationInputSchema),z.lazy(() => AppCommentUncheckedUpdateManyWithoutAAppInputSchema) ]),
}).strict();

export default AppCommentUpdateManyWithWhereWithoutAAppInputSchema;
