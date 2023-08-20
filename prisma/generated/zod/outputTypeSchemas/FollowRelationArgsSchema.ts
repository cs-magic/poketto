import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FollowRelationSelectSchema } from '../inputTypeSchemas/FollowRelationSelectSchema';
import { FollowRelationIncludeSchema } from '../inputTypeSchemas/FollowRelationIncludeSchema';

export const FollowRelationArgsSchema: z.ZodType<Prisma.FollowRelationArgs> = z.object({
  select: z.lazy(() => FollowRelationSelectSchema).optional(),
  include: z.lazy(() => FollowRelationIncludeSchema).optional(),
}).strict();

export default FollowRelationArgsSchema;
