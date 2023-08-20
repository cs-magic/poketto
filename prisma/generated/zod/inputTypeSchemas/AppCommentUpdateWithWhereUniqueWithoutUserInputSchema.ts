import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCommentWhereUniqueInputSchema } from './AppCommentWhereUniqueInputSchema';
import { AppCommentUpdateWithoutUserInputSchema } from './AppCommentUpdateWithoutUserInputSchema';
import { AppCommentUncheckedUpdateWithoutUserInputSchema } from './AppCommentUncheckedUpdateWithoutUserInputSchema';

export const AppCommentUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AppCommentUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AppCommentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AppCommentUpdateWithoutUserInputSchema),z.lazy(() => AppCommentUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export default AppCommentUpdateWithWhereUniqueWithoutUserInputSchema;
