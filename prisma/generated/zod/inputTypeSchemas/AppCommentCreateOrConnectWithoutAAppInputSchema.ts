import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCommentWhereUniqueInputSchema } from './AppCommentWhereUniqueInputSchema';
import { AppCommentCreateWithoutAAppInputSchema } from './AppCommentCreateWithoutAAppInputSchema';
import { AppCommentUncheckedCreateWithoutAAppInputSchema } from './AppCommentUncheckedCreateWithoutAAppInputSchema';

export const AppCommentCreateOrConnectWithoutAAppInputSchema: z.ZodType<Prisma.AppCommentCreateOrConnectWithoutAAppInput> = z.object({
  where: z.lazy(() => AppCommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppCommentCreateWithoutAAppInputSchema),z.lazy(() => AppCommentUncheckedCreateWithoutAAppInputSchema) ]),
}).strict();

export default AppCommentCreateOrConnectWithoutAAppInputSchema;
