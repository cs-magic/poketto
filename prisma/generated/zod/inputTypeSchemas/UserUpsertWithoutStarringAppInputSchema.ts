import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserUpdateWithoutStarringAppInputSchema } from './UserUpdateWithoutStarringAppInputSchema';
import { UserUncheckedUpdateWithoutStarringAppInputSchema } from './UserUncheckedUpdateWithoutStarringAppInputSchema';
import { UserCreateWithoutStarringAppInputSchema } from './UserCreateWithoutStarringAppInputSchema';
import { UserUncheckedCreateWithoutStarringAppInputSchema } from './UserUncheckedCreateWithoutStarringAppInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutStarringAppInputSchema: z.ZodType<Prisma.UserUpsertWithoutStarringAppInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutStarringAppInputSchema),z.lazy(() => UserUncheckedUpdateWithoutStarringAppInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutStarringAppInputSchema),z.lazy(() => UserUncheckedCreateWithoutStarringAppInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutStarringAppInputSchema;
