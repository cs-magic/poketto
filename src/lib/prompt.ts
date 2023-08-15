import { type PrommptMessage, type User } from '@prisma/client'
import { type ChatMessage, ChatMessageFormatType } from '.prisma/client'
import { ConversationWithRelation } from '@/ds'
import { nanoid } from 'nanoid'

export const prompt2chatMessage = (u: User, conversationId: string, m: PrommptMessage): ChatMessage => ({
	userId: u.id, createdAt: new Date(), updatedAt: new Date(), format: ChatMessageFormatType.text, conversationId,
	id: nanoid(), content: m.content, role: m.role,
})
