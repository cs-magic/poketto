import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutFollowedByInputSchema } from './UserCreateWithoutFollowedByInputSchema';
import { UserUncheckedCreateWithoutFollowedByInputSchema } from './UserUncheckedCreateWithoutFollowedByInputSchema';
import { UserCreateOrConnectWithoutFollowedByInputSchema } from './UserCreateOrConnectWithoutFollowedByInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutFollowedByInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutFollowedByInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFollowedByInputSchema),z.lazy(() => UserUncheckedCreateWithoutFollowedByInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFollowedByInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutFollowedByInputSchema;
