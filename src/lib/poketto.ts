import { type IPokettoBasic, type IPokettoChannel, type IPokettoChannelListView } from '@/ds/poketto'
import { nanoid } from 'nanoid'
import { getTimestampMS } from '@/lib/datetime'
import { user } from '@/config/user'

export const getPokettoUri = (poketto: IPokettoBasic) => `/p/${poketto.id}`

export const createPokettoChannel = (poketto: IPokettoBasic): IPokettoChannel => ({
	messages: [
		{
			type: 'notification',
			id: nanoid(),
			channelId: poketto.id,
			createdAt: getTimestampMS(),
			content: `Welcome ${user.name} to join in ${poketto.basic.title} !`,
			interactions: {},
			parentId: undefined,
			userId: undefined,
		},
	],
	poketto: poketto,
	users: [
		{ ...user, state: 'active', type: 'user' },
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
