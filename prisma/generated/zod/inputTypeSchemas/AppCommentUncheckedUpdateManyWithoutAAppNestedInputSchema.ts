import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCommentCreateWithoutAAppInputSchema } from './AppCommentCreateWithoutAAppInputSchema';
import { AppCommentUncheckedCreateWithoutAAppInputSchema } from './AppCommentUncheckedCreateWithoutAAppInputSchema';
import { AppCommentCreateOrConnectWithoutAAppInputSchema } from './AppCommentCreateOrConnectWithoutAAppInputSchema';
import { AppCommentUpsertWithWhereUniqueWithoutAAppInputSchema } from './AppCommentUpsertWithWhereUniqueWithoutAAppInputSchema';
import { AppCommentCreateManyAAppInputEnvelopeSchema } from './AppCommentCreateManyAAppInputEnvelopeSchema';
import { AppCommentWhereUniqueInputSchema } from './AppCommentWhereUniqueInputSchema';
import { AppCommentUpdateWithWhereUniqueWithoutAAppInputSchema } from './AppCommentUpdateWithWhereUniqueWithoutAAppInputSchema';
import { AppCommentUpdateManyWithWhereWithoutAAppInputSchema } from './AppCommentUpdateManyWithWhereWithoutAAppInputSchema';
import { AppCommentScalarWhereInputSchema } from './AppCommentScalarWhereInputSchema';

export const AppCommentUncheckedUpdateManyWithoutAAppNestedInputSchema: z.ZodType<Prisma.AppCommentUncheckedUpdateManyWithoutAAppNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppCommentCreateWithoutAAppInputSchema),z.lazy(() => AppCommentCreateWithoutAAppInputSchema).array(),z.lazy(() => AppCommentUncheckedCreateWithoutAAppInputSchema),z.lazy(() => AppCommentUncheckedCreateWithoutAAppInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppCommentCreateOrConnectWithoutAAppInputSchema),z.lazy(() => AppCommentCreateOrConnectWithoutAAppInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppCommentUpsertWithWhereUniqueWithoutAAppInputSchema),z.lazy(() => AppCommentUpsertWithWhereUniqueWithoutAAppInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppCommentCreateManyAAppInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AppCommentWhereUniqueInputSchema),z.lazy(() => AppCommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppCommentWhereUniqueInputSchema),z.lazy(() => AppCommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppCommentWhereUniqueInputSchema),z.lazy(() => AppCommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppCommentWhereUniqueInputSchema),z.lazy(() => AppCommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppCommentUpdateWithWhereUniqueWithoutAAppInputSchema),z.lazy(() => AppCommentUpdateWithWhereUniqueWithoutAAppInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppCommentUpdateManyWithWhereWithoutAAppInputSchema),z.lazy(() => AppCommentUpdateManyWithWhereWithoutAAppInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppCommentScalarWhereInputSchema),z.lazy(() => AppCommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default AppCommentUncheckedUpdateManyWithoutAAppNestedInputSchema;
