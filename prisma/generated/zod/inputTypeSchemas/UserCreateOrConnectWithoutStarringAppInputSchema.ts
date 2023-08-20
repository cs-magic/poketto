import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutStarringAppInputSchema } from './UserCreateWithoutStarringAppInputSchema';
import { UserUncheckedCreateWithoutStarringAppInputSchema } from './UserUncheckedCreateWithoutStarringAppInputSchema';

export const UserCreateOrConnectWithoutStarringAppInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutStarringAppInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutStarringAppInputSchema),z.lazy(() => UserUncheckedCreateWithoutStarringAppInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutStarringAppInputSchema;
