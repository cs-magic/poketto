import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCreateWithoutCategoryInputSchema } from './AppCreateWithoutCategoryInputSchema';
import { AppUncheckedCreateWithoutCategoryInputSchema } from './AppUncheckedCreateWithoutCategoryInputSchema';
import { AppCreateOrConnectWithoutCategoryInputSchema } from './AppCreateOrConnectWithoutCategoryInputSchema';
import { AppCreateManyCategoryInputEnvelopeSchema } from './AppCreateManyCategoryInputEnvelopeSchema';
import { AppWhereUniqueInputSchema } from './AppWhereUniqueInputSchema';

export const AppCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.AppCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutCategoryInputSchema),z.lazy(() => AppCreateWithoutCategoryInputSchema).array(),z.lazy(() => AppUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => AppUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => AppCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default AppCreateNestedManyWithoutCategoryInputSchema;
