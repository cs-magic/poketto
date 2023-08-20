import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutChatMessageActionsInputSchema } from './UserUpdateWithoutChatMessageActionsInputSchema';
import { UserUncheckedUpdateWithoutChatMessageActionsInputSchema } from './UserUncheckedUpdateWithoutChatMessageActionsInputSchema';

export const UserUpdateToOneWithWhereWithoutChatMessageActionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutChatMessageActionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutChatMessageActionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutChatMessageActionsInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutChatMessageActionsInputSchema;
