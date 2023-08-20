import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { InvitationRelationWhereUniqueInputSchema } from './InvitationRelationWhereUniqueInputSchema';
import { InvitationRelationUpdateWithoutToInputSchema } from './InvitationRelationUpdateWithoutToInputSchema';
import { InvitationRelationUncheckedUpdateWithoutToInputSchema } from './InvitationRelationUncheckedUpdateWithoutToInputSchema';

export const InvitationRelationUpdateWithWhereUniqueWithoutToInputSchema: z.ZodType<Prisma.InvitationRelationUpdateWithWhereUniqueWithoutToInput> = z.object({
  where: z.lazy(() => InvitationRelationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => InvitationRelationUpdateWithoutToInputSchema),z.lazy(() => InvitationRelationUncheckedUpdateWithoutToInputSchema) ]),
}).strict();

export default InvitationRelationUpdateWithWhereUniqueWithoutToInputSchema;
