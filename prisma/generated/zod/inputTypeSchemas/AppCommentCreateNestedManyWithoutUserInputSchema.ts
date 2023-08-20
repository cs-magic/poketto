import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCommentCreateWithoutUserInputSchema } from './AppCommentCreateWithoutUserInputSchema';
import { AppCommentUncheckedCreateWithoutUserInputSchema } from './AppCommentUncheckedCreateWithoutUserInputSchema';
import { AppCommentCreateOrConnectWithoutUserInputSchema } from './AppCommentCreateOrConnectWithoutUserInputSchema';
import { AppCommentCreateManyUserInputEnvelopeSchema } from './AppCommentCreateManyUserInputEnvelopeSchema';
import { AppCommentWhereUniqueInputSchema } from './AppCommentWhereUniqueInputSchema';

export const AppCommentCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AppCommentCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AppCommentCreateWithoutUserInputSchema),z.lazy(() => AppCommentCreateWithoutUserInputSchema).array(),z.lazy(() => AppCommentUncheckedCreateWithoutUserInputSchema),z.lazy(() => AppCommentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppCommentCreateOrConnectWithoutUserInputSchema),z.lazy(() => AppCommentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppCommentCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AppCommentWhereUniqueInputSchema),z.lazy(() => AppCommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default AppCommentCreateNestedManyWithoutUserInputSchema;
