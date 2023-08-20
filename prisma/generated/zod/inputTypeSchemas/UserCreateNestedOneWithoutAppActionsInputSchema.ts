import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutAppActionsInputSchema } from './UserCreateWithoutAppActionsInputSchema';
import { UserUncheckedCreateWithoutAppActionsInputSchema } from './UserUncheckedCreateWithoutAppActionsInputSchema';
import { UserCreateOrConnectWithoutAppActionsInputSchema } from './UserCreateOrConnectWithoutAppActionsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutAppActionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAppActionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAppActionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAppActionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAppActionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutAppActionsInputSchema;
