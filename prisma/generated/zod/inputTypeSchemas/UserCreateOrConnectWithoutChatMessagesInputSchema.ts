import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutChatMessagesInputSchema } from './UserCreateWithoutChatMessagesInputSchema';
import { UserUncheckedCreateWithoutChatMessagesInputSchema } from './UserUncheckedCreateWithoutChatMessagesInputSchema';

export const UserCreateOrConnectWithoutChatMessagesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutChatMessagesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutChatMessagesInputSchema),z.lazy(() => UserUncheckedCreateWithoutChatMessagesInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutChatMessagesInputSchema;
