import { type AppWithRelation, type IApp, type IAppListView } from '@/ds/poketto'
import { nanoid } from 'nanoid'
import { getTimestampMS } from '@/lib/datetime'

export const getAppLink = (appId: string) => `/p/${appId}`

export const createApp = (poketto: AppWithRelation): IApp => ({
	messages: [{
		type: 'notification',
		format: 'text',
		role: 'system', // no effect since this is a notification
		id: nanoid(),
		appId: poketto.id,
		createdAt: new Date(),
		content: `Welcome {{userName}} to join in ${poketto.name} !`,
		interactions: {},
		parentId: undefined,
		userId: undefined,
		
	}], poketto, users: [// todo: add User
		// { ...user, state: 'active', type: 'user' },
	], latestTime: getTimestampMS(), joinTime: getTimestampMS(),
})

export const getAppListView = (app: IApp): IAppListView => {
	const latestMessage = app.messages[app.messages.length - 1]!
	return ({
		id: app.poketto.id,
		avatar: app.poketto.avatar,
		title: app.poketto.name,
		latestMessage,
		latestUser: app.users.find((u) => u.id === latestMessage.userId),
	})
}
