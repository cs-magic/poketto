import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { InvitationRelationCreateWithoutFromInputSchema } from './InvitationRelationCreateWithoutFromInputSchema';
import { InvitationRelationUncheckedCreateWithoutFromInputSchema } from './InvitationRelationUncheckedCreateWithoutFromInputSchema';
import { InvitationRelationCreateOrConnectWithoutFromInputSchema } from './InvitationRelationCreateOrConnectWithoutFromInputSchema';
import { InvitationRelationUpsertWithWhereUniqueWithoutFromInputSchema } from './InvitationRelationUpsertWithWhereUniqueWithoutFromInputSchema';
import { InvitationRelationCreateManyFromInputEnvelopeSchema } from './InvitationRelationCreateManyFromInputEnvelopeSchema';
import { InvitationRelationWhereUniqueInputSchema } from './InvitationRelationWhereUniqueInputSchema';
import { InvitationRelationUpdateWithWhereUniqueWithoutFromInputSchema } from './InvitationRelationUpdateWithWhereUniqueWithoutFromInputSchema';
import { InvitationRelationUpdateManyWithWhereWithoutFromInputSchema } from './InvitationRelationUpdateManyWithWhereWithoutFromInputSchema';
import { InvitationRelationScalarWhereInputSchema } from './InvitationRelationScalarWhereInputSchema';

export const InvitationRelationUpdateManyWithoutFromNestedInputSchema: z.ZodType<Prisma.InvitationRelationUpdateManyWithoutFromNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvitationRelationCreateWithoutFromInputSchema),z.lazy(() => InvitationRelationCreateWithoutFromInputSchema).array(),z.lazy(() => InvitationRelationUncheckedCreateWithoutFromInputSchema),z.lazy(() => InvitationRelationUncheckedCreateWithoutFromInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationRelationCreateOrConnectWithoutFromInputSchema),z.lazy(() => InvitationRelationCreateOrConnectWithoutFromInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvitationRelationUpsertWithWhereUniqueWithoutFromInputSchema),z.lazy(() => InvitationRelationUpsertWithWhereUniqueWithoutFromInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationRelationCreateManyFromInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvitationRelationWhereUniqueInputSchema),z.lazy(() => InvitationRelationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvitationRelationWhereUniqueInputSchema),z.lazy(() => InvitationRelationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvitationRelationWhereUniqueInputSchema),z.lazy(() => InvitationRelationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvitationRelationWhereUniqueInputSchema),z.lazy(() => InvitationRelationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvitationRelationUpdateWithWhereUniqueWithoutFromInputSchema),z.lazy(() => InvitationRelationUpdateWithWhereUniqueWithoutFromInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvitationRelationUpdateManyWithWhereWithoutFromInputSchema),z.lazy(() => InvitationRelationUpdateManyWithWhereWithoutFromInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvitationRelationScalarWhereInputSchema),z.lazy(() => InvitationRelationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default InvitationRelationUpdateManyWithoutFromNestedInputSchema;
