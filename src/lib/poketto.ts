import { type IPokettoBasic, type IPokettoChannel, type IPokettoChannelListView } from '@/ds/poketto'
import { nanoid } from 'nanoid'
import { getTimestampMS } from '@/lib/datetime'

export const getChannelUri = (pokettoId: string) => `/p/${pokettoId}`

export const createChannel = (poketto: IPokettoBasic): IPokettoChannel => ({
	messages: [
		{
			type: 'notification',
			format: 'text',
			role: 'system', // no effect since this is a notification
			id: nanoid(),
			channelId: poketto.id,
			createdAt: new Date(),
			content: `Welcome {{userName}} to join in ${poketto.basic.title} !`,
			interactions: {},
			parentId: undefined,
			userId: undefined,
			
		},
	],
	poketto: poketto,
	users: [
		// todo: add User
		// { ...user, state: 'active', type: 'user' },
	],
	latestTime: getTimestampMS(),
	joinTime: getTimestampMS(),
})

export const getChannelListView = (poketto: IPokettoChannel): IPokettoChannelListView => {
	const latestMessage = poketto.messages[poketto.messages.length - 1]!
	return ({
		id: poketto.poketto.id,
		avatar: poketto.poketto.basic.avatar,
		title: poketto.poketto.basic.title,
		latestMessage,
		latestUser: poketto.users.find((u) => u.id === latestMessage.userId),
	})
}
