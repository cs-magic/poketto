import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserUpdateWithoutChatMessageActionsInputSchema } from './UserUpdateWithoutChatMessageActionsInputSchema';
import { UserUncheckedUpdateWithoutChatMessageActionsInputSchema } from './UserUncheckedUpdateWithoutChatMessageActionsInputSchema';
import { UserCreateWithoutChatMessageActionsInputSchema } from './UserCreateWithoutChatMessageActionsInputSchema';
import { UserUncheckedCreateWithoutChatMessageActionsInputSchema } from './UserUncheckedCreateWithoutChatMessageActionsInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutChatMessageActionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutChatMessageActionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutChatMessageActionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutChatMessageActionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutChatMessageActionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutChatMessageActionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutChatMessageActionsInputSchema;
