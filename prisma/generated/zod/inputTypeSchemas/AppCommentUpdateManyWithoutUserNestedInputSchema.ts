import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCommentCreateWithoutUserInputSchema } from './AppCommentCreateWithoutUserInputSchema';
import { AppCommentUncheckedCreateWithoutUserInputSchema } from './AppCommentUncheckedCreateWithoutUserInputSchema';
import { AppCommentCreateOrConnectWithoutUserInputSchema } from './AppCommentCreateOrConnectWithoutUserInputSchema';
import { AppCommentUpsertWithWhereUniqueWithoutUserInputSchema } from './AppCommentUpsertWithWhereUniqueWithoutUserInputSchema';
import { AppCommentCreateManyUserInputEnvelopeSchema } from './AppCommentCreateManyUserInputEnvelopeSchema';
import { AppCommentWhereUniqueInputSchema } from './AppCommentWhereUniqueInputSchema';
import { AppCommentUpdateWithWhereUniqueWithoutUserInputSchema } from './AppCommentUpdateWithWhereUniqueWithoutUserInputSchema';
import { AppCommentUpdateManyWithWhereWithoutUserInputSchema } from './AppCommentUpdateManyWithWhereWithoutUserInputSchema';
import { AppCommentScalarWhereInputSchema } from './AppCommentScalarWhereInputSchema';

export const AppCommentUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AppCommentUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppCommentCreateWithoutUserInputSchema),z.lazy(() => AppCommentCreateWithoutUserInputSchema).array(),z.lazy(() => AppCommentUncheckedCreateWithoutUserInputSchema),z.lazy(() => AppCommentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppCommentCreateOrConnectWithoutUserInputSchema),z.lazy(() => AppCommentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppCommentUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AppCommentUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppCommentCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AppCommentWhereUniqueInputSchema),z.lazy(() => AppCommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppCommentWhereUniqueInputSchema),z.lazy(() => AppCommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppCommentWhereUniqueInputSchema),z.lazy(() => AppCommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppCommentWhereUniqueInputSchema),z.lazy(() => AppCommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppCommentUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AppCommentUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppCommentUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AppCommentUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppCommentScalarWhereInputSchema),z.lazy(() => AppCommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default AppCommentUpdateManyWithoutUserNestedInputSchema;
