import { z } from 'zod';

export const PlatformTypeSchema = z.enum(['Poketto','FlowGPT','OpenAI','MidJourney','StableDiffusion','OpenChat']);

export type PlatformTypeType = `${z.infer<typeof PlatformTypeSchema>}`

export default PlatformTypeSchema;
