import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutInvitedFromInputSchema } from './UserUpdateWithoutInvitedFromInputSchema';
import { UserUncheckedUpdateWithoutInvitedFromInputSchema } from './UserUncheckedUpdateWithoutInvitedFromInputSchema';

export const UserUpdateToOneWithWhereWithoutInvitedFromInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutInvitedFromInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutInvitedFromInputSchema),z.lazy(() => UserUncheckedUpdateWithoutInvitedFromInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutInvitedFromInputSchema;
