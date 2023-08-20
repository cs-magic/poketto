import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StarringAppCreateManyUserInputSchema } from './StarringAppCreateManyUserInputSchema';

export const StarringAppCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.StarringAppCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => StarringAppCreateManyUserInputSchema),z.lazy(() => StarringAppCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default StarringAppCreateManyUserInputEnvelopeSchema;
