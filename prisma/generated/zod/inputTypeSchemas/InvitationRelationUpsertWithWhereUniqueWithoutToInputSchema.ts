import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { InvitationRelationWhereUniqueInputSchema } from './InvitationRelationWhereUniqueInputSchema';
import { InvitationRelationUpdateWithoutToInputSchema } from './InvitationRelationUpdateWithoutToInputSchema';
import { InvitationRelationUncheckedUpdateWithoutToInputSchema } from './InvitationRelationUncheckedUpdateWithoutToInputSchema';
import { InvitationRelationCreateWithoutToInputSchema } from './InvitationRelationCreateWithoutToInputSchema';
import { InvitationRelationUncheckedCreateWithoutToInputSchema } from './InvitationRelationUncheckedCreateWithoutToInputSchema';

export const InvitationRelationUpsertWithWhereUniqueWithoutToInputSchema: z.ZodType<Prisma.InvitationRelationUpsertWithWhereUniqueWithoutToInput> = z.object({
  where: z.lazy(() => InvitationRelationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => InvitationRelationUpdateWithoutToInputSchema),z.lazy(() => InvitationRelationUncheckedUpdateWithoutToInputSchema) ]),
  create: z.union([ z.lazy(() => InvitationRelationCreateWithoutToInputSchema),z.lazy(() => InvitationRelationUncheckedCreateWithoutToInputSchema) ]),
}).strict();

export default InvitationRelationUpsertWithWhereUniqueWithoutToInputSchema;
