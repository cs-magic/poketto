import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserUpdateWithoutAppActionsInputSchema } from './UserUpdateWithoutAppActionsInputSchema';
import { UserUncheckedUpdateWithoutAppActionsInputSchema } from './UserUncheckedUpdateWithoutAppActionsInputSchema';
import { UserCreateWithoutAppActionsInputSchema } from './UserCreateWithoutAppActionsInputSchema';
import { UserUncheckedCreateWithoutAppActionsInputSchema } from './UserUncheckedCreateWithoutAppActionsInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutAppActionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAppActionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAppActionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAppActionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAppActionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAppActionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutAppActionsInputSchema;
