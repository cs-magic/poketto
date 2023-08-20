import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserUpdateWithoutChatMessagesInputSchema } from './UserUpdateWithoutChatMessagesInputSchema';
import { UserUncheckedUpdateWithoutChatMessagesInputSchema } from './UserUncheckedUpdateWithoutChatMessagesInputSchema';
import { UserCreateWithoutChatMessagesInputSchema } from './UserCreateWithoutChatMessagesInputSchema';
import { UserUncheckedCreateWithoutChatMessagesInputSchema } from './UserUncheckedCreateWithoutChatMessagesInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutChatMessagesInputSchema: z.ZodType<Prisma.UserUpsertWithoutChatMessagesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutChatMessagesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutChatMessagesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutChatMessagesInputSchema),z.lazy(() => UserUncheckedCreateWithoutChatMessagesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutChatMessagesInputSchema;
