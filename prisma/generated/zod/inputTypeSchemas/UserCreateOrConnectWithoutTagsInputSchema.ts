import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutTagsInputSchema } from './UserCreateWithoutTagsInputSchema';
import { UserUncheckedCreateWithoutTagsInputSchema } from './UserUncheckedCreateWithoutTagsInputSchema';

export const UserCreateOrConnectWithoutTagsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTagsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutTagsInputSchema),z.lazy(() => UserUncheckedCreateWithoutTagsInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutTagsInputSchema;
