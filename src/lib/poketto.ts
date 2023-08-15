import { type AppWithRelation, type IAppListView, type IPoketto, type UsingAppWithRelation } from '@/ds/poketto'
import { nanoid } from 'nanoid'

export const getAppLink = (appId: string) => `/p/${appId}`

export const createApp = (poketto: AppWithRelation): IPoketto => ({
	messages: [{
		type: 'notification', format: 'text', role: 'system', // no effect since this is a notification
		id: nanoid(), appId: poketto.id, createdAt: new Date(), content: `Welcome {{userName}} to join in ${poketto.name} !`, interactions: {}, parentId: undefined, userId: undefined,

	}], app: poketto, users: [// todo: add User
		// { ...user, state: 'active', type: 'user' },
	], latestTime: new Date(), joinTime: new Date(),
})

export const getAppListView = (conversation: UsingAppWithRelation): IAppListView => {
	const latestMessage = conversation.messages[conversation.messages.length - 1]!
	return ({
		id: conversation.app.id,
		avatar: conversation.app.avatar,
		title: conversation.app.name,
		latestMessage,
		latestUser: latestMessage.user,
	})
}
