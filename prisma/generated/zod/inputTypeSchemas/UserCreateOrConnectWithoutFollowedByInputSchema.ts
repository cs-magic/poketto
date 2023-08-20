import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutFollowedByInputSchema } from './UserCreateWithoutFollowedByInputSchema';
import { UserUncheckedCreateWithoutFollowedByInputSchema } from './UserUncheckedCreateWithoutFollowedByInputSchema';

export const UserCreateOrConnectWithoutFollowedByInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutFollowedByInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutFollowedByInputSchema),z.lazy(() => UserUncheckedCreateWithoutFollowedByInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutFollowedByInputSchema;
