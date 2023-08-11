import { type sampleComment } from '@/ds/flowgpt/comment'
import { type sampleConversation } from '@/ds/flowgpt/conversation'
import { type sampleBasicPrompt } from '@/ds/flowgpt/prompt'
import React from 'react'

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
	
	recommended = 'recommended',
	top = 'top',
	mostSaved = 'most-saved',
	trending = 'trending',
	new = 'new',
	follow = 'follow',
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
