import type sampleComment from '../../sample/flowgpt/comment.json'
import type sampleConversation from '../../sample/flowgpt/conversation.json'
import type sampleBasicPrompt from '../../sample/flowgpt/prompt-basic.json'


export type FlowgptPromptBasic = typeof sampleBasicPrompt
export type FlowgptConversation = typeof sampleConversation
export type FlowgptComment = typeof sampleComment

export const GET_PROMPTS_BATCH_SIZE = 36

export interface FlowgptPromptFull // todo: add comments
	extends FlowgptPromptBasic {
	Conversation: FlowgptConversation
}

export enum FlowGPTSortOrder {
	
	recommended = 'recommended',
	top = 'top',
	mostSaved = 'most-saved',
	trending = 'trending',
	new = 'new',
	follow = 'follow',
}
