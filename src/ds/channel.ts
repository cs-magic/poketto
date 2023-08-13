import { type ID, type IUser } from '@/ds/general'
import { type IPokettoBasic } from '@/ds/poketto'

export interface IContent {
	type: 'text' | 'image' | 'audio' | 'video' | 'link' | 'quote'
	content: string
}

/**
 * - 判断是否用户消息取决于 user 类型，因此在 user 里实现
 */
export interface IMessage {
	id: ID
	channelId: ID //
	userId: ID //，不要用 user，应该从 channel 中读
	parentId?: ID
	
	createdAt: number
	content: IContent
	interactions: Record<string, number>
}

export interface IChannelUser
	extends IUser {
	state: 'active' | 'leave'
	type:
		'user'
		| 'bot' // 预设消息
		| 'system' // like tg: Mark Shawn joined the group
}

export interface IChannel {
	pokettoId: ID // poketto id
	users: IChannelUser[]
	messages: IMessage[]
}

export interface IChannelListView {
	target: {
		avatar: string
		title: string
	}
	latest: {
		message: IMessage
		user: IUser
	}
}


export class Channel
	implements IChannel {
	public messages: IMessage[]
	public users: IChannelUser[]
	
	protected poketto: IPokettoBasic
	
	get pokettoId() {
		return this.poketto.id
	}
	
	constructor(poketto: IPokettoBasic) {
		this.poketto = poketto
		this.messages = []
		this.users = []
	}
	
	private getUser(userId: ID) {
		return this.users.find((u) => u.id === userId)
	}
	
	setMessages(messages: IMessage[]) {
		this.messages = messages
	}
	
	pushMessages(...messages: IMessage[]) {
		this.messages.push(...messages)
	}
	
	userJoin(user: IUser) {
		this.users.push({ ...user, type: 'user', state: 'active' })
	}
	
	userLeave(userId: ID) {
		this.getUser(userId)!.state = 'leave'
	}
	
	listView(): IChannelListView {
		const message = this.messages[this.messages.length - 1]!
		const user = this.getUser(message.userId)!
		return {
			target: {
				avatar: this.poketto.basic.avatar,
				title: this.poketto.basic.title,
			},
			latest: {
				message,
				user,
			},
		}
	}
}
