import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppTagCreateManyCreatorInputSchema } from './AppTagCreateManyCreatorInputSchema';

export const AppTagCreateManyCreatorInputEnvelopeSchema: z.ZodType<Prisma.AppTagCreateManyCreatorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AppTagCreateManyCreatorInputSchema),z.lazy(() => AppTagCreateManyCreatorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default AppTagCreateManyCreatorInputEnvelopeSchema;
