import { z } from 'zod';

export const ChatMessageFormatTypeSchema = z.enum(['text','image','voice','video','map','realtimeVoice','realtimeVideo','systemNotification']);

export type ChatMessageFormatTypeType = `${z.infer<typeof ChatMessageFormatTypeSchema>}`

export default ChatMessageFormatTypeSchema;
