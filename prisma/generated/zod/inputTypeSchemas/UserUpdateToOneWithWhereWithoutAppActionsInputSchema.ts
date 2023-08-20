import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutAppActionsInputSchema } from './UserUpdateWithoutAppActionsInputSchema';
import { UserUncheckedUpdateWithoutAppActionsInputSchema } from './UserUncheckedUpdateWithoutAppActionsInputSchema';

export const UserUpdateToOneWithWhereWithoutAppActionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAppActionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAppActionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAppActionsInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutAppActionsInputSchema;
