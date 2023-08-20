import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutStarringAppInputSchema } from './UserCreateWithoutStarringAppInputSchema';
import { UserUncheckedCreateWithoutStarringAppInputSchema } from './UserUncheckedCreateWithoutStarringAppInputSchema';
import { UserCreateOrConnectWithoutStarringAppInputSchema } from './UserCreateOrConnectWithoutStarringAppInputSchema';
import { UserUpsertWithoutStarringAppInputSchema } from './UserUpsertWithoutStarringAppInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutStarringAppInputSchema } from './UserUpdateToOneWithWhereWithoutStarringAppInputSchema';
import { UserUpdateWithoutStarringAppInputSchema } from './UserUpdateWithoutStarringAppInputSchema';
import { UserUncheckedUpdateWithoutStarringAppInputSchema } from './UserUncheckedUpdateWithoutStarringAppInputSchema';

export const UserUpdateOneRequiredWithoutStarringAppNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutStarringAppNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutStarringAppInputSchema),z.lazy(() => UserUncheckedCreateWithoutStarringAppInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutStarringAppInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutStarringAppInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutStarringAppInputSchema),z.lazy(() => UserUpdateWithoutStarringAppInputSchema),z.lazy(() => UserUncheckedUpdateWithoutStarringAppInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutStarringAppNestedInputSchema;
