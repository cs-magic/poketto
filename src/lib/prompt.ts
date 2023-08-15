import { type PrommptMessage, type User } from '@prisma/client'
import { type ChatMessage } from '.prisma/client'
import { ConversationWithRelation } from '@/ds'

export const prompt2chatMessage = (u: User, conversationId: string, m: PrommptMessage): ChatMessage => ({
	...m, userId: u.id, createdAt: new Date(), updatedAt: new Date(), format: 'text', conversationId,
})
