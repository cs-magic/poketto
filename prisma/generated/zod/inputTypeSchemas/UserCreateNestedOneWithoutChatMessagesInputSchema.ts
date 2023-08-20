import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutChatMessagesInputSchema } from './UserCreateWithoutChatMessagesInputSchema';
import { UserUncheckedCreateWithoutChatMessagesInputSchema } from './UserUncheckedCreateWithoutChatMessagesInputSchema';
import { UserCreateOrConnectWithoutChatMessagesInputSchema } from './UserCreateOrConnectWithoutChatMessagesInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutChatMessagesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutChatMessagesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutChatMessagesInputSchema),z.lazy(() => UserUncheckedCreateWithoutChatMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutChatMessagesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutChatMessagesInputSchema;
