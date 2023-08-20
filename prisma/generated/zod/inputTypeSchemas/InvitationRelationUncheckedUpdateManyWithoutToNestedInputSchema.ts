import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { InvitationRelationCreateWithoutToInputSchema } from './InvitationRelationCreateWithoutToInputSchema';
import { InvitationRelationUncheckedCreateWithoutToInputSchema } from './InvitationRelationUncheckedCreateWithoutToInputSchema';
import { InvitationRelationCreateOrConnectWithoutToInputSchema } from './InvitationRelationCreateOrConnectWithoutToInputSchema';
import { InvitationRelationUpsertWithWhereUniqueWithoutToInputSchema } from './InvitationRelationUpsertWithWhereUniqueWithoutToInputSchema';
import { InvitationRelationCreateManyToInputEnvelopeSchema } from './InvitationRelationCreateManyToInputEnvelopeSchema';
import { InvitationRelationWhereUniqueInputSchema } from './InvitationRelationWhereUniqueInputSchema';
import { InvitationRelationUpdateWithWhereUniqueWithoutToInputSchema } from './InvitationRelationUpdateWithWhereUniqueWithoutToInputSchema';
import { InvitationRelationUpdateManyWithWhereWithoutToInputSchema } from './InvitationRelationUpdateManyWithWhereWithoutToInputSchema';
import { InvitationRelationScalarWhereInputSchema } from './InvitationRelationScalarWhereInputSchema';

export const InvitationRelationUncheckedUpdateManyWithoutToNestedInputSchema: z.ZodType<Prisma.InvitationRelationUncheckedUpdateManyWithoutToNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvitationRelationCreateWithoutToInputSchema),z.lazy(() => InvitationRelationCreateWithoutToInputSchema).array(),z.lazy(() => InvitationRelationUncheckedCreateWithoutToInputSchema),z.lazy(() => InvitationRelationUncheckedCreateWithoutToInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationRelationCreateOrConnectWithoutToInputSchema),z.lazy(() => InvitationRelationCreateOrConnectWithoutToInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvitationRelationUpsertWithWhereUniqueWithoutToInputSchema),z.lazy(() => InvitationRelationUpsertWithWhereUniqueWithoutToInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationRelationCreateManyToInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvitationRelationWhereUniqueInputSchema),z.lazy(() => InvitationRelationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvitationRelationWhereUniqueInputSchema),z.lazy(() => InvitationRelationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvitationRelationWhereUniqueInputSchema),z.lazy(() => InvitationRelationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvitationRelationWhereUniqueInputSchema),z.lazy(() => InvitationRelationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvitationRelationUpdateWithWhereUniqueWithoutToInputSchema),z.lazy(() => InvitationRelationUpdateWithWhereUniqueWithoutToInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvitationRelationUpdateManyWithWhereWithoutToInputSchema),z.lazy(() => InvitationRelationUpdateManyWithWhereWithoutToInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvitationRelationScalarWhereInputSchema),z.lazy(() => InvitationRelationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default InvitationRelationUncheckedUpdateManyWithoutToNestedInputSchema;
