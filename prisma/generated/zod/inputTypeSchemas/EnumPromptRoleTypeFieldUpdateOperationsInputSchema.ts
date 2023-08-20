import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PromptRoleTypeSchema } from './PromptRoleTypeSchema';

export const EnumPromptRoleTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPromptRoleTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => PromptRoleTypeSchema).optional()
}).strict();

export default EnumPromptRoleTypeFieldUpdateOperationsInputSchema;
