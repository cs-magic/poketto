import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { InvitationRelationWhereUniqueInputSchema } from './InvitationRelationWhereUniqueInputSchema';
import { InvitationRelationUpdateWithoutFromInputSchema } from './InvitationRelationUpdateWithoutFromInputSchema';
import { InvitationRelationUncheckedUpdateWithoutFromInputSchema } from './InvitationRelationUncheckedUpdateWithoutFromInputSchema';
import { InvitationRelationCreateWithoutFromInputSchema } from './InvitationRelationCreateWithoutFromInputSchema';
import { InvitationRelationUncheckedCreateWithoutFromInputSchema } from './InvitationRelationUncheckedCreateWithoutFromInputSchema';

export const InvitationRelationUpsertWithWhereUniqueWithoutFromInputSchema: z.ZodType<Prisma.InvitationRelationUpsertWithWhereUniqueWithoutFromInput> = z.object({
  where: z.lazy(() => InvitationRelationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => InvitationRelationUpdateWithoutFromInputSchema),z.lazy(() => InvitationRelationUncheckedUpdateWithoutFromInputSchema) ]),
  create: z.union([ z.lazy(() => InvitationRelationCreateWithoutFromInputSchema),z.lazy(() => InvitationRelationUncheckedCreateWithoutFromInputSchema) ]),
}).strict();

export default InvitationRelationUpsertWithWhereUniqueWithoutFromInputSchema;
