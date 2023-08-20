import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { FollowRelationCreateWithoutToInputSchema } from './FollowRelationCreateWithoutToInputSchema';
import { FollowRelationUncheckedCreateWithoutToInputSchema } from './FollowRelationUncheckedCreateWithoutToInputSchema';
import { FollowRelationCreateOrConnectWithoutToInputSchema } from './FollowRelationCreateOrConnectWithoutToInputSchema';
import { FollowRelationUpsertWithWhereUniqueWithoutToInputSchema } from './FollowRelationUpsertWithWhereUniqueWithoutToInputSchema';
import { FollowRelationCreateManyToInputEnvelopeSchema } from './FollowRelationCreateManyToInputEnvelopeSchema';
import { FollowRelationWhereUniqueInputSchema } from './FollowRelationWhereUniqueInputSchema';
import { FollowRelationUpdateWithWhereUniqueWithoutToInputSchema } from './FollowRelationUpdateWithWhereUniqueWithoutToInputSchema';
import { FollowRelationUpdateManyWithWhereWithoutToInputSchema } from './FollowRelationUpdateManyWithWhereWithoutToInputSchema';
import { FollowRelationScalarWhereInputSchema } from './FollowRelationScalarWhereInputSchema';

export const FollowRelationUpdateManyWithoutToNestedInputSchema: z.ZodType<Prisma.FollowRelationUpdateManyWithoutToNestedInput> = z.object({
  create: z.union([ z.lazy(() => FollowRelationCreateWithoutToInputSchema),z.lazy(() => FollowRelationCreateWithoutToInputSchema).array(),z.lazy(() => FollowRelationUncheckedCreateWithoutToInputSchema),z.lazy(() => FollowRelationUncheckedCreateWithoutToInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FollowRelationCreateOrConnectWithoutToInputSchema),z.lazy(() => FollowRelationCreateOrConnectWithoutToInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FollowRelationUpsertWithWhereUniqueWithoutToInputSchema),z.lazy(() => FollowRelationUpsertWithWhereUniqueWithoutToInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FollowRelationCreateManyToInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FollowRelationWhereUniqueInputSchema),z.lazy(() => FollowRelationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FollowRelationWhereUniqueInputSchema),z.lazy(() => FollowRelationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FollowRelationWhereUniqueInputSchema),z.lazy(() => FollowRelationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FollowRelationWhereUniqueInputSchema),z.lazy(() => FollowRelationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FollowRelationUpdateWithWhereUniqueWithoutToInputSchema),z.lazy(() => FollowRelationUpdateWithWhereUniqueWithoutToInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FollowRelationUpdateManyWithWhereWithoutToInputSchema),z.lazy(() => FollowRelationUpdateManyWithWhereWithoutToInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FollowRelationScalarWhereInputSchema),z.lazy(() => FollowRelationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default FollowRelationUpdateManyWithoutToNestedInputSchema;
