import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppActionCreateManyUserInputSchema } from './AppActionCreateManyUserInputSchema';

export const AppActionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AppActionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AppActionCreateManyUserInputSchema),z.lazy(() => AppActionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default AppActionCreateManyUserInputEnvelopeSchema;
