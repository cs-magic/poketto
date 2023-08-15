import { type AppWithRelation, type IAppListView, type IConversation, type ConversationWithRelation } from '@/ds/poketto'
import { nanoid } from 'nanoid'
import { ChatMessageFormatType, type User } from '@prisma/client'

export const getAppLink = (sid: string, pid: string) => `/s/${sid}/${pid}`

export const createApp = (user: User, app: AppWithRelation): IConversation => ({
	messages: [{
		format: ChatMessageFormatType.systemNotification,
		role: 'system', // no effect since this is a notification
		id: nanoid(),
		content: `Welcome {{userName}} to join in ${app.name} !`,
		userId: user.id,
		usingAppId: app.id,
		createdAt: new Date(),
		updatedAt: new Date(),
		
	}],
	app: app,
	users: [// todo: add User
		// { ...user, state: 'active', type: 'user' },
	], latestTime: new Date(), joinTime: new Date(),
})

export const getAppListView = (conversation: ConversationWithRelation): IAppListView => {
	const latestMessage = conversation.messages[conversation.messages.length - 1]!
	return ({
		id: conversation.app.id,
		avatar: conversation.app.avatar,
		title: conversation.app.name,
		latestMessage,
		latestUser: latestMessage.user,
	})
}
