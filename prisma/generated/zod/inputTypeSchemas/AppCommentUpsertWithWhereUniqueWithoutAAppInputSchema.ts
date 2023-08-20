import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCommentWhereUniqueInputSchema } from './AppCommentWhereUniqueInputSchema';
import { AppCommentUpdateWithoutAAppInputSchema } from './AppCommentUpdateWithoutAAppInputSchema';
import { AppCommentUncheckedUpdateWithoutAAppInputSchema } from './AppCommentUncheckedUpdateWithoutAAppInputSchema';
import { AppCommentCreateWithoutAAppInputSchema } from './AppCommentCreateWithoutAAppInputSchema';
import { AppCommentUncheckedCreateWithoutAAppInputSchema } from './AppCommentUncheckedCreateWithoutAAppInputSchema';

export const AppCommentUpsertWithWhereUniqueWithoutAAppInputSchema: z.ZodType<Prisma.AppCommentUpsertWithWhereUniqueWithoutAAppInput> = z.object({
  where: z.lazy(() => AppCommentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AppCommentUpdateWithoutAAppInputSchema),z.lazy(() => AppCommentUncheckedUpdateWithoutAAppInputSchema) ]),
  create: z.union([ z.lazy(() => AppCommentCreateWithoutAAppInputSchema),z.lazy(() => AppCommentUncheckedCreateWithoutAAppInputSchema) ]),
}).strict();

export default AppCommentUpsertWithWhereUniqueWithoutAAppInputSchema;
