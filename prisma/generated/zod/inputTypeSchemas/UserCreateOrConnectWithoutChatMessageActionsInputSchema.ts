import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutChatMessageActionsInputSchema } from './UserCreateWithoutChatMessageActionsInputSchema';
import { UserUncheckedCreateWithoutChatMessageActionsInputSchema } from './UserUncheckedCreateWithoutChatMessageActionsInputSchema';

export const UserCreateOrConnectWithoutChatMessageActionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutChatMessageActionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutChatMessageActionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutChatMessageActionsInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutChatMessageActionsInputSchema;
