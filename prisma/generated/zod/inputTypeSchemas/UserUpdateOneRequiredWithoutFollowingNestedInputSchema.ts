import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutFollowingInputSchema } from './UserCreateWithoutFollowingInputSchema';
import { UserUncheckedCreateWithoutFollowingInputSchema } from './UserUncheckedCreateWithoutFollowingInputSchema';
import { UserCreateOrConnectWithoutFollowingInputSchema } from './UserCreateOrConnectWithoutFollowingInputSchema';
import { UserUpsertWithoutFollowingInputSchema } from './UserUpsertWithoutFollowingInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutFollowingInputSchema } from './UserUpdateToOneWithWhereWithoutFollowingInputSchema';
import { UserUpdateWithoutFollowingInputSchema } from './UserUpdateWithoutFollowingInputSchema';
import { UserUncheckedUpdateWithoutFollowingInputSchema } from './UserUncheckedUpdateWithoutFollowingInputSchema';

export const UserUpdateOneRequiredWithoutFollowingNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutFollowingNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFollowingInputSchema),z.lazy(() => UserUncheckedCreateWithoutFollowingInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFollowingInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutFollowingInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutFollowingInputSchema),z.lazy(() => UserUpdateWithoutFollowingInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFollowingInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutFollowingNestedInputSchema;
