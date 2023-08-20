import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { AppCommentCreateManyUserInputSchema } from './AppCommentCreateManyUserInputSchema';

export const AppCommentCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AppCommentCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AppCommentCreateManyUserInputSchema),z.lazy(() => AppCommentCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default AppCommentCreateManyUserInputEnvelopeSchema;
