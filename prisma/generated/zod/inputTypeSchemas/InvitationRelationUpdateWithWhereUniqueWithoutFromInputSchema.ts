import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { InvitationRelationWhereUniqueInputSchema } from './InvitationRelationWhereUniqueInputSchema';
import { InvitationRelationUpdateWithoutFromInputSchema } from './InvitationRelationUpdateWithoutFromInputSchema';
import { InvitationRelationUncheckedUpdateWithoutFromInputSchema } from './InvitationRelationUncheckedUpdateWithoutFromInputSchema';

export const InvitationRelationUpdateWithWhereUniqueWithoutFromInputSchema: z.ZodType<Prisma.InvitationRelationUpdateWithWhereUniqueWithoutFromInput> = z.object({
  where: z.lazy(() => InvitationRelationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => InvitationRelationUpdateWithoutFromInputSchema),z.lazy(() => InvitationRelationUncheckedUpdateWithoutFromInputSchema) ]),
}).strict();

export default InvitationRelationUpdateWithWhereUniqueWithoutFromInputSchema;
