import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutFollowingInputSchema } from './UserCreateWithoutFollowingInputSchema';
import { UserUncheckedCreateWithoutFollowingInputSchema } from './UserUncheckedCreateWithoutFollowingInputSchema';
import { UserCreateOrConnectWithoutFollowingInputSchema } from './UserCreateOrConnectWithoutFollowingInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutFollowingInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutFollowingInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFollowingInputSchema),z.lazy(() => UserUncheckedCreateWithoutFollowingInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFollowingInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutFollowingInputSchema;
