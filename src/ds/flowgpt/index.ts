import { type sampleComment } from '@/ds/flowgpt/sample/comment'
import { type sampleConversation } from '@/ds/flowgpt/sample/conversation'
import { type sampleBasicPrompt } from '@/ds/flowgpt/sample/prompt'

export type IFlowgptComment = typeof sampleComment
export type IFlowgptBasicPrompt = typeof sampleBasicPrompt
export type IFlowgptConversation = typeof sampleConversation

export interface IFlowgptFullPrompt
	extends IFlowgptBasicPrompt {
	Conversation: IFlowgptConversation
}

export enum AgentAspect {
	detail = 'detail',
	// comments = 'comments',
	// sample = 'sample',
	history = 'history',
	conversation = 'conversation'
}

export enum SortOrder {
	new = 'new',
	
	recommend = 'recommend',
	trending = 'trending',
	following = 'following',
	top = 'top'
}


export enum DataDimension {
	trends = 'trends',
	popularity = 'popularity',
	ranking = 'ranking',
	adminWeight = 'adminWeight',
	temperature = 'temperature',
	views = 'views',
	uses = 'uses',
	upvotes = 'upvotes',
	saves = 'saves',
	shares = 'shares',
	impressions = 'impressions',
	comments = 'comments',
	cup = 'cup',
	fop = 'fop',
	rankingForNew = 'rankingForNew',
	tip = 'tip',
}

export const GET_PROMPTS_BATCH_SIZE = 36
