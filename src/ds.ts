import { Prisma, type User } from '.prisma/client'
import { type ChatMessage } from '@prisma/client'
import { type Message } from 'ai'
import type sampleBasicPrompt from '@/data/flowgpt/prompt-basic_2.json'
import type sampleComment from '@/data/flowgpt/comment.getComments/comment.json'
import type sampleConversation from '@/data/flowgpt/conversation.json'
import UserGetPayload = Prisma.UserGetPayload
import AppGetPayload = Prisma.AppGetPayload
import ConversationGetPayload = Prisma.ConversationGetPayload

// -----------------------------------------------------------------------------
// general
// -----------------------------------------------------------------------------

export type ID = string | number

// -----------------------------------------------------------------------------
// database
// -----------------------------------------------------------------------------

export const userWithRelationsInclude = {
	followedBy: true,
	following: true,
}

export enum UserAppRelationType {
	created = 'created',
	used = 'used',
	starred = 'starred',
}

export type UserWithRelations =
	UserGetPayload<{
		include: typeof userWithRelationsInclude
	}>
	& {
	impact: number
}


// -----------------------------------------------------------------------------
// flowgpt
// -----------------------------------------------------------------------------

export type IFlowgptPromptBasic = typeof sampleBasicPrompt
export type IFlowgptConversation = typeof sampleConversation
export type IFlowGPTComment = typeof sampleComment
export const GET_PROMPTS_BATCH_SIZE = 36

export interface FlowgptPromptFull // todo: add comments
	extends IFlowgptPromptBasic {
	Conversation: IFlowgptConversation
}

export enum FlowGPTSortOrder {
	
	recommended = 'recommended',
	top = 'top',
	mostSaved = 'most-saved',
	trending = 'trending',
	new = 'new',
	follow = 'follow',
}

export interface IAppComment extends Omit<IFlowGPTComment, 'user'> {
	ratedStars: number
	content: string // !important: support markdown
	user: User
}

export interface IPokettoFunction /* extends ChatGPTFunction */
{

}

export const SYSTEM_USER_ID = 'poketto' as const
export type SYSTEM_USER_TYPE = typeof SYSTEM_USER_ID

export interface IAppUser extends User {
	state: 'active' | 'leave'
	type: 'user' | 'bot' // 预设消息
		| SYSTEM_USER_TYPE // like tg: Mark Shawn joined the group
}

export interface IConversation {
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
	creator: true, actions: true, // note: unnecessary to track appActions
	tags: true, state: true, comments: true, model: {
		include: { // nested includes: https://stackoverflow.com/a/62053744
			initPrompts: true,
		},
	}, // todo: category
}
export const conversationInclude = {
	app: { include: appInclude }, messages: {
		include: {
			user: true, // 获取每条信息的用户
		},
	},
}
type IAppInclude = typeof appInclude
type IConversationInclude = typeof conversationInclude
export type AppWithRelation = AppGetPayload<{
	include: IAppInclude
}>
export type ConversationWithRelation = ConversationGetPayload<{
	include: IConversationInclude
}>


// -----------------------------------------------------------------------------
// poketto
// -----------------------------------------------------------------------------


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
