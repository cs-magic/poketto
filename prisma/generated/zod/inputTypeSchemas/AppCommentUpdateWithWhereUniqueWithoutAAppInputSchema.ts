import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCommentWhereUniqueInputSchema } from './AppCommentWhereUniqueInputSchema';
import { AppCommentUpdateWithoutAAppInputSchema } from './AppCommentUpdateWithoutAAppInputSchema';
import { AppCommentUncheckedUpdateWithoutAAppInputSchema } from './AppCommentUncheckedUpdateWithoutAAppInputSchema';

export const AppCommentUpdateWithWhereUniqueWithoutAAppInputSchema: z.ZodType<Prisma.AppCommentUpdateWithWhereUniqueWithoutAAppInput> = z.object({
  where: z.lazy(() => AppCommentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AppCommentUpdateWithoutAAppInputSchema),z.lazy(() => AppCommentUncheckedUpdateWithoutAAppInputSchema) ]),
}).strict();

export default AppCommentUpdateWithWhereUniqueWithoutAAppInputSchema;
