import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutChatMessagesInputSchema } from './UserUpdateWithoutChatMessagesInputSchema';
import { UserUncheckedUpdateWithoutChatMessagesInputSchema } from './UserUncheckedUpdateWithoutChatMessagesInputSchema';

export const UserUpdateToOneWithWhereWithoutChatMessagesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutChatMessagesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutChatMessagesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutChatMessagesInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutChatMessagesInputSchema;
