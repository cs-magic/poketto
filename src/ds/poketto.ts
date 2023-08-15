import { type ID, type IUser } from '@/ds/general'
import { type FlowgptPromptFull, FlowGPTSortOrder, type IFlowGPTComment, type IFlowgptConversation, type IFlowgptPromptBasic } from '@/ds/flowgpt'
import d from '@/lib/datetime'
import { type Message } from 'ai'
import { nanoid } from 'nanoid'
import { PlatformType, Prisma, PromptRoleType, type User } from '.prisma/client'
import dayjs from 'dayjs'
import { DEFAULT_APP_VERSION } from '@/config/system'
import AppGetPayload = Prisma.AppGetPayload
import UsingAppGetPayload = Prisma.UsingAppGetPayload
import { ChatMessage } from '@prisma/client'

/**
 * - 判断是否用户消息取决于 user 类型，因此在 user 里实现
 */
export interface IAppMessage extends Message {
	type: 'user' | 'notification'
	format: 'text' | 'image' | 'audio' | 'video' | 'link' | 'quote'

	appId: ID //
	userId?: ID // 1. 不要存user，这样可以保证批量更新 2. 通知等就没有 userId
	parentId?: ID

	interactions: Record<string, number>
}

export interface IPokettoConversation {
	createdAt: Date
	messages: IAppMessage[]
}

export const flowgpt2poketto_conversation = (f: IFlowgptConversation): IPokettoConversation => ({
	createdAt: d(f.createdAt).toDate(),
	messages: f.messages.map((m) => ({
		...m,
		type: 'user',
		format: 'text',
		appId: f.id,
		userId: undefined,
		parentId: undefined,
		interactions: {},
		id: nanoid(),
		createdAt: new Date(),
		role: m.role as 'system' | 'user' | 'assistant' | 'function',
	})),
})


export interface IAppComment
	extends Omit<IFlowGPTComment, 'user'> {
	ratedStars: number
	content: string // !important: support markdown
	user: IUser
}

export interface IPokettoFunction /* extends ChatGPTFunction */ {

}

export const SYSTEM_USER_ID = 'poketto' as const
export type SYSTEM_USER_TYPE = typeof SYSTEM_USER_ID


export interface IAppUser
	extends User {
	state: 'active' | 'leave'
	type:
	'user'
	| 'bot' // 预设消息
	| SYSTEM_USER_TYPE // like tg: Mark Shawn joined the group
}

export interface IPoketto {
	joinTime: Date
	latestTime: Date
	app: AppWithRelation
	users: IAppUser[]
	messages: ChatMessage[]
}

export interface IAppListView {
	id: string
	avatar: string
	title: string
	latestMessage: ChatMessage
	latestUser: User | null
}

export const SortOrder = { ...FlowGPTSortOrder }
export type SortOrder = FlowGPTSortOrder

export const appInclude = {
		creator: true,
		actions: true, // note: unnecessary to track appActions
		tags: true,
		state: true,
		comments: true,
		model: {
			include: { // nested includes: https://stackoverflow.com/a/62053744
				initPrompts: true,
			}
		}
		// todo: category
	}

export const conversationInclude = {
		app: {include: appInclude},
		messages: {
			include: {
				user: true // 获取每条信息的用户
			}
		}
	}

type IAppInclude = typeof appInclude
type IConversationInclude = typeof conversationInclude

export type AppWithRelation = AppGetPayload<{include: IAppInclude}>

export type UsingAppWithRelation = UsingAppGetPayload<{include: IConversationInclude}>

export const flowgpt2pokettoApp = (p: IFlowgptPromptBasic | FlowgptPromptFull): AppWithRelation => {

	return {
		comments: [], // todo: add comments
		id: p.id,
		name: p.title,
		avatar: p.thumbnailURL,
		categoryId: p.categoryId,
		language: p.language,
		desc: p.description,
		updatedAt: dayjs(p.updatedAt).toDate(),
		createdAt: dayjs(p.createdAt).toDate(),
		platform: PlatformType.FlowGPT,
		version: DEFAULT_APP_VERSION,
		creatorId: p.userId,
		creator: {
			id: p.User.id, name: p.User.name, avatar: p.User.image, username: p.User.uri, desc: null, email: null,
		},
		tags: p.Tag.map((t) => ({
			id: t.name, name: t.name, createdAt: null, updatedAt: null, creatorId: null,
		})),
		state: {
			id: p.id, createdAt: null, updatedAt: null, appId: p.id, views: p.views, calls: p.uses, forks: 0, tips: p.tip, stars: p.saves, shares: p.shares,
		},
		actions: [],
		model: {
			id: p.id,
			createdAt: null,
			updatedAt: null,
			appId: p.id,
			type: p.model,
			isOpenSource: true,
			temperature: p.temperature,
			initPrompts: [
				{
					id: nanoid(), appModelId: p.id,
					role: PromptRoleType.system, content: p.initPrompt,
				},
			],
		},
	}

}
export const flowgpt2poketto_comment = (comment: IFlowGPTComment): IAppComment => ({
	...comment, ratedStars: 0, content: comment.body, user: {
		...comment.user, avatar: comment.user.image,
	},
})
