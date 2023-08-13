import { type ID, type IUser } from '@/ds/general'
import { type IFlowGPTComment, type IFlowgptConversation } from '@/ds/flowgpt'
import d from '@/lib/datetime'
import { type Message } from 'ai'
import { nanoid } from 'nanoid'

/**
 * - 判断是否用户消息取决于 user 类型，因此在 user 里实现
 */
export interface IChannelMessage extends Message {
	type: 'user' | 'notification'
	format: 'text' | 'image' | 'audio' | 'video' | 'link' | 'quote'
	
	channelId: ID //
	userId?: ID // 1. 不要存user，这样可以保证批量更新 2. 通知等就没有 userId
	parentId?: ID
	
	interactions: Record<string, number>
}

export interface IPokettoConversation {
	createdAt: Date
	messages: IChannelMessage[]
}

export const flowgpt2poketto_conversation = (f: IFlowgptConversation): IPokettoConversation => ({
	createdAt: d(f.createdAt).toDate(),
	messages: f.messages.map((m) => ({
		...m,
		type: 'user',
		format: 'text',
		channelId: f.id,
		userId: undefined,
		parentId: undefined,
		interactions: {},
		id: nanoid(),
		createdAt: new Date(),
		role: m.role as 'system' | 'user' | 'assistant' | 'function',
	})),
})


export interface IPokettoBasic {
	id: string
	user: IUser
	conversation?: IPokettoConversation,
	comments?: IPokettoComment[]
	basic: {
		version: string // !important: 用户打开的时候默认拉取最新版
		language: string
		title: string
		desc: string
		avatar: string
		// todo: industry 和 category 有啥区别，两者有必要并存吗
		industry: ID[] // 按级分类（父子关系），e.g. [娱乐, 游戏]
		category: ID[] // 按级分类（父子关系），e.g. [生产力, 平面设计]
		tags: string[] // 并列关系，e.g. 法律 | GPT4，用户在创建 tag 的时候，只跟自己的语言有关
		createdAt: Date
		updatedAt: Date
	}
	permissions: {
		visible: boolean | ID[]
		openSource: boolean // 用户是否可以看到 initPrompts，以及支持 fork
	}
	model: {
		manufacturer: string // ChatGPT | Claude | OpenChat | ...
		type: string // 具体的模型号：gpt-3.5-xxx | gpt-4-xx | ...
		initPrompts: IChannelMessage[] // 不直接用 systemPrompt 是因为要支持 few-shot
		functions: IPokettoFunction[] // todo: support plugins
		// ... other args
		temperature?: number
	}
	state: {
		/**
		 * [before see] view(visible)
		 * --> [see] interactions / star / fork / share
		 * --> [used] comment(rate) / tip(付小费) / share
		 */
		views: number
		stars: number // 收藏（也就可以使用了）
		forks: number // 前提要开源
		shares: number
		
		comments: number
		ratedStars: number // 基于评论平均出来（考虑要不要基于用户声望加权）
		tips: number
		
		// 用户使用相关
		users: number // 统计总用户数
		triggers: number // 统计用户总的交互次数
		tokens: number // 统计所有会话的词量
		// ... 其他统计指标（比如频率……）
	} & Record<string, number> // interactions 统计类似 discord 的表情回复
	
}


export interface IPokettoComment
	extends Omit<IFlowGPTComment, 'user'> {
	ratedStars: number
	content: string // !important: support markdown
	user: IUser
}

export interface IPokettoFunction /* extends ChatGPTFunction */
{
	
}


export interface IPokettoMessageContent {
	type: 'text' | 'image' | 'audio' | 'video' | 'link' | 'quote' | 'notification'
	content: string
}

export const SYSTEM_USER_ID = 'poketto' as const
export type SYSTEM_USER_TYPE = typeof SYSTEM_USER_ID


export interface IPokettoChannelUser
	extends IUser {
	state: 'active' | 'leave'
	type:
		'user'
		| 'bot' // 预设消息
		| SYSTEM_USER_TYPE // like tg: Mark Shawn joined the group
}

export interface IPokettoChannel {
	joinTime: number
	latestTime: number
	poketto: IPokettoBasic
	users: IPokettoChannelUser[]
	messages: IChannelMessage[]
}

export interface IPokettoChannelListView {
	id: string
	avatar: string
	title: string
	latestMessage: IChannelMessage
	latestUser?: IPokettoChannelUser
}
