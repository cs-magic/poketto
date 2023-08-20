import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCommentCreateWithoutAAppInputSchema } from './AppCommentCreateWithoutAAppInputSchema';
import { AppCommentUncheckedCreateWithoutAAppInputSchema } from './AppCommentUncheckedCreateWithoutAAppInputSchema';
import { AppCommentCreateOrConnectWithoutAAppInputSchema } from './AppCommentCreateOrConnectWithoutAAppInputSchema';
import { AppCommentCreateManyAAppInputEnvelopeSchema } from './AppCommentCreateManyAAppInputEnvelopeSchema';
import { AppCommentWhereUniqueInputSchema } from './AppCommentWhereUniqueInputSchema';

export const AppCommentUncheckedCreateNestedManyWithoutAAppInputSchema: z.ZodType<Prisma.AppCommentUncheckedCreateNestedManyWithoutAAppInput> = z.object({
  create: z.union([ z.lazy(() => AppCommentCreateWithoutAAppInputSchema),z.lazy(() => AppCommentCreateWithoutAAppInputSchema).array(),z.lazy(() => AppCommentUncheckedCreateWithoutAAppInputSchema),z.lazy(() => AppCommentUncheckedCreateWithoutAAppInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppCommentCreateOrConnectWithoutAAppInputSchema),z.lazy(() => AppCommentCreateOrConnectWithoutAAppInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppCommentCreateManyAAppInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AppCommentWhereUniqueInputSchema),z.lazy(() => AppCommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default AppCommentUncheckedCreateNestedManyWithoutAAppInputSchema;
