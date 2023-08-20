import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutCreatedAppsInputSchema } from './UserCreateWithoutCreatedAppsInputSchema';
import { UserUncheckedCreateWithoutCreatedAppsInputSchema } from './UserUncheckedCreateWithoutCreatedAppsInputSchema';
import { UserCreateOrConnectWithoutCreatedAppsInputSchema } from './UserCreateOrConnectWithoutCreatedAppsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutCreatedAppsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCreatedAppsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedAppsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedAppsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCreatedAppsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutCreatedAppsInputSchema;
