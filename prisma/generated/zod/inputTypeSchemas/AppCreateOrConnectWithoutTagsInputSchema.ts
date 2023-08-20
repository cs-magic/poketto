import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppWhereUniqueInputSchema } from './AppWhereUniqueInputSchema';
import { AppCreateWithoutTagsInputSchema } from './AppCreateWithoutTagsInputSchema';
import { AppUncheckedCreateWithoutTagsInputSchema } from './AppUncheckedCreateWithoutTagsInputSchema';

export const AppCreateOrConnectWithoutTagsInputSchema: z.ZodType<Prisma.AppCreateOrConnectWithoutTagsInput> = z.object({
  where: z.lazy(() => AppWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppCreateWithoutTagsInputSchema),z.lazy(() => AppUncheckedCreateWithoutTagsInputSchema) ]),
}).strict();

export default AppCreateOrConnectWithoutTagsInputSchema;
