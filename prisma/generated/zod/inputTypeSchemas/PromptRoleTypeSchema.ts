import { z } from 'zod';

export const PromptRoleTypeSchema = z.enum(['system','user','assistant','function']);

export type PromptRoleTypeType = `${z.infer<typeof PromptRoleTypeSchema>}`

export default PromptRoleTypeSchema;
