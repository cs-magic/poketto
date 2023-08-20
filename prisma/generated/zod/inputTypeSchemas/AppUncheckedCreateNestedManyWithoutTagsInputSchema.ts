import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCreateWithoutTagsInputSchema } from './AppCreateWithoutTagsInputSchema';
import { AppUncheckedCreateWithoutTagsInputSchema } from './AppUncheckedCreateWithoutTagsInputSchema';
import { AppCreateOrConnectWithoutTagsInputSchema } from './AppCreateOrConnectWithoutTagsInputSchema';
import { AppWhereUniqueInputSchema } from './AppWhereUniqueInputSchema';

export const AppUncheckedCreateNestedManyWithoutTagsInputSchema: z.ZodType<Prisma.AppUncheckedCreateNestedManyWithoutTagsInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutTagsInputSchema),z.lazy(() => AppCreateWithoutTagsInputSchema).array(),z.lazy(() => AppUncheckedCreateWithoutTagsInputSchema),z.lazy(() => AppUncheckedCreateWithoutTagsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppCreateOrConnectWithoutTagsInputSchema),z.lazy(() => AppCreateOrConnectWithoutTagsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default AppUncheckedCreateNestedManyWithoutTagsInputSchema;
