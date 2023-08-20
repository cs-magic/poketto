import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutFollowedByInputSchema } from './UserCreateWithoutFollowedByInputSchema';
import { UserUncheckedCreateWithoutFollowedByInputSchema } from './UserUncheckedCreateWithoutFollowedByInputSchema';
import { UserCreateOrConnectWithoutFollowedByInputSchema } from './UserCreateOrConnectWithoutFollowedByInputSchema';
import { UserUpsertWithoutFollowedByInputSchema } from './UserUpsertWithoutFollowedByInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutFollowedByInputSchema } from './UserUpdateToOneWithWhereWithoutFollowedByInputSchema';
import { UserUpdateWithoutFollowedByInputSchema } from './UserUpdateWithoutFollowedByInputSchema';
import { UserUncheckedUpdateWithoutFollowedByInputSchema } from './UserUncheckedUpdateWithoutFollowedByInputSchema';

export const UserUpdateOneRequiredWithoutFollowedByNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutFollowedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFollowedByInputSchema),z.lazy(() => UserUncheckedCreateWithoutFollowedByInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFollowedByInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutFollowedByInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutFollowedByInputSchema),z.lazy(() => UserUpdateWithoutFollowedByInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFollowedByInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutFollowedByNestedInputSchema;
