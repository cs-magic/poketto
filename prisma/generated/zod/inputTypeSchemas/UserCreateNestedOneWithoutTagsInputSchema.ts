import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateWithoutTagsInputSchema } from './UserCreateWithoutTagsInputSchema';
import { UserUncheckedCreateWithoutTagsInputSchema } from './UserUncheckedCreateWithoutTagsInputSchema';
import { UserCreateOrConnectWithoutTagsInputSchema } from './UserCreateOrConnectWithoutTagsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutTagsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTagsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTagsInputSchema),z.lazy(() => UserUncheckedCreateWithoutTagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTagsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutTagsInputSchema;
