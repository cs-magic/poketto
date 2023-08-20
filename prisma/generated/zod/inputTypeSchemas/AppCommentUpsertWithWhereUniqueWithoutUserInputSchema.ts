import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCommentWhereUniqueInputSchema } from './AppCommentWhereUniqueInputSchema';
import { AppCommentUpdateWithoutUserInputSchema } from './AppCommentUpdateWithoutUserInputSchema';
import { AppCommentUncheckedUpdateWithoutUserInputSchema } from './AppCommentUncheckedUpdateWithoutUserInputSchema';
import { AppCommentCreateWithoutUserInputSchema } from './AppCommentCreateWithoutUserInputSchema';
import { AppCommentUncheckedCreateWithoutUserInputSchema } from './AppCommentUncheckedCreateWithoutUserInputSchema';

export const AppCommentUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AppCommentUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AppCommentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AppCommentUpdateWithoutUserInputSchema),z.lazy(() => AppCommentUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AppCommentCreateWithoutUserInputSchema),z.lazy(() => AppCommentUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default AppCommentUpsertWithWhereUniqueWithoutUserInputSchema;
