import type sampleComment from '../../sample/flowgpt/comment.getComments/comment.json'
import type sampleConversation from '../../sample/flowgpt/conversation.json'
import type sampleBasicPrompt from '../../sample/flowgpt/prompt-basic_2.json'


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

