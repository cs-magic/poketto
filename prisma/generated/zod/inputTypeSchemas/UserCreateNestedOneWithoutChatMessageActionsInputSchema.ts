import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutChatMessageActionsInputSchema } from './UserCreateWithoutChatMessageActionsInputSchema';
import { UserUncheckedCreateWithoutChatMessageActionsInputSchema } from './UserUncheckedCreateWithoutChatMessageActionsInputSchema';
import { UserCreateOrConnectWithoutChatMessageActionsInputSchema } from './UserCreateOrConnectWithoutChatMessageActionsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutChatMessageActionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutChatMessageActionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutChatMessageActionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutChatMessageActionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutChatMessageActionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutChatMessageActionsInputSchema;
