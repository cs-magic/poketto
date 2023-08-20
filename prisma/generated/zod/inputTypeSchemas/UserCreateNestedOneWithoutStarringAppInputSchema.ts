import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutStarringAppInputSchema } from './UserCreateWithoutStarringAppInputSchema';
import { UserUncheckedCreateWithoutStarringAppInputSchema } from './UserUncheckedCreateWithoutStarringAppInputSchema';
import { UserCreateOrConnectWithoutStarringAppInputSchema } from './UserCreateOrConnectWithoutStarringAppInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutStarringAppInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutStarringAppInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutStarringAppInputSchema),z.lazy(() => UserUncheckedCreateWithoutStarringAppInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutStarringAppInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutStarringAppInputSchema;
