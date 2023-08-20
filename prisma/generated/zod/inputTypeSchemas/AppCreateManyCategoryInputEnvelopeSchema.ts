import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCreateManyCategoryInputSchema } from './AppCreateManyCategoryInputSchema';

export const AppCreateManyCategoryInputEnvelopeSchema: z.ZodType<Prisma.AppCreateManyCategoryInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AppCreateManyCategoryInputSchema),z.lazy(() => AppCreateManyCategoryInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default AppCreateManyCategoryInputEnvelopeSchema;
