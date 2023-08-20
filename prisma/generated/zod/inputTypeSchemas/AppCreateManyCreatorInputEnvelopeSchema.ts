import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCreateManyCreatorInputSchema } from './AppCreateManyCreatorInputSchema';

export const AppCreateManyCreatorInputEnvelopeSchema: z.ZodType<Prisma.AppCreateManyCreatorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AppCreateManyCreatorInputSchema),z.lazy(() => AppCreateManyCreatorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default AppCreateManyCreatorInputEnvelopeSchema;
