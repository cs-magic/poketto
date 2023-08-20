import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutFollowingInputSchema } from './UserCreateWithoutFollowingInputSchema';
import { UserUncheckedCreateWithoutFollowingInputSchema } from './UserUncheckedCreateWithoutFollowingInputSchema';

export const UserCreateOrConnectWithoutFollowingInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutFollowingInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutFollowingInputSchema),z.lazy(() => UserUncheckedCreateWithoutFollowingInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutFollowingInputSchema;
