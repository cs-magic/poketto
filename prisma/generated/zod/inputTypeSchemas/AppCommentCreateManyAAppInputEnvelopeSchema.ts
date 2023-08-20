import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCommentCreateManyAAppInputSchema } from './AppCommentCreateManyAAppInputSchema';

export const AppCommentCreateManyAAppInputEnvelopeSchema: z.ZodType<Prisma.AppCommentCreateManyAAppInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AppCommentCreateManyAAppInputSchema),z.lazy(() => AppCommentCreateManyAAppInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default AppCommentCreateManyAAppInputEnvelopeSchema;
