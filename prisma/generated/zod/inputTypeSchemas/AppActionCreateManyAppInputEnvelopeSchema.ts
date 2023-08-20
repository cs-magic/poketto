import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppActionCreateManyAppInputSchema } from './AppActionCreateManyAppInputSchema';

export const AppActionCreateManyAppInputEnvelopeSchema: z.ZodType<Prisma.AppActionCreateManyAppInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AppActionCreateManyAppInputSchema),z.lazy(() => AppActionCreateManyAppInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default AppActionCreateManyAppInputEnvelopeSchema;
