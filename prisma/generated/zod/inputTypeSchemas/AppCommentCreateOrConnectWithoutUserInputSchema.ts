import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCommentWhereUniqueInputSchema } from './AppCommentWhereUniqueInputSchema';
import { AppCommentCreateWithoutUserInputSchema } from './AppCommentCreateWithoutUserInputSchema';
import { AppCommentUncheckedCreateWithoutUserInputSchema } from './AppCommentUncheckedCreateWithoutUserInputSchema';

export const AppCommentCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AppCommentCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AppCommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppCommentCreateWithoutUserInputSchema),z.lazy(() => AppCommentUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default AppCommentCreateOrConnectWithoutUserInputSchema;
