import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StarringAppCreateManyAppInputSchema } from './StarringAppCreateManyAppInputSchema';

export const StarringAppCreateManyAppInputEnvelopeSchema: z.ZodType<Prisma.StarringAppCreateManyAppInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => StarringAppCreateManyAppInputSchema),z.lazy(() => StarringAppCreateManyAppInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default StarringAppCreateManyAppInputEnvelopeSchema;
