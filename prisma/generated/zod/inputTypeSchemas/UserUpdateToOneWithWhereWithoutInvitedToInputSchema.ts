import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutInvitedToInputSchema } from './UserUpdateWithoutInvitedToInputSchema';
import { UserUncheckedUpdateWithoutInvitedToInputSchema } from './UserUncheckedUpdateWithoutInvitedToInputSchema';

export const UserUpdateToOneWithWhereWithoutInvitedToInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutInvitedToInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutInvitedToInputSchema),z.lazy(() => UserUncheckedUpdateWithoutInvitedToInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutInvitedToInputSchema;
