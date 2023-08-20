import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutAppActionsInputSchema } from './UserCreateWithoutAppActionsInputSchema';
import { UserUncheckedCreateWithoutAppActionsInputSchema } from './UserUncheckedCreateWithoutAppActionsInputSchema';

export const UserCreateOrConnectWithoutAppActionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAppActionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAppActionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAppActionsInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutAppActionsInputSchema;
