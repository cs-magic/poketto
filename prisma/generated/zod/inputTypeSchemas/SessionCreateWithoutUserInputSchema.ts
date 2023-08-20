import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.date()
}).strict();

export default SessionCreateWithoutUserInputSchema;
