import { create, type StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { FixedCacheQueue } from '@/lib/algo'


import { type FlowgptPromptBasic, type FlowgptPromptFull, FlowGPTSortOrder } from '@/ds/flowgpt'

/**
 * ui
 */
export enum CardsLayoutType {
	masonry = 'masonry',
	grid = 'grid',
}

export interface UIState {
	collapsed: boolean
	switchCollapse: () => void
	cardsLayout: CardsLayoutType
	setCardsLayout: (v: CardsLayoutType) => void
	showChatList: boolean
	setShowChatList: (v: boolean) => void
	showChatDetail: boolean
	setShowChatDetail: (v: boolean) => void
}

export const createUISlice: StoreSlice<UIState> = (setState, getState, store) => ({
	collapsed: false,
	cardsLayout: CardsLayoutType.masonry,
	switchCollapse: () => setState((state) => {state.collapsed = !state.collapsed}),
	setCardsLayout: (v) => setState((state) => {state.cardsLayout = v}),
	showChatDetail: true,
	setShowChatDetail: (v) => setState((state) => {state.showChatDetail = v}),
	showChatList: true,
	setShowChatList: (v) => setState((state) => {state.showChatList = v}),
})

/**
 * flowgpt
 */
export interface FlowGPTState {
	sort: FlowGPTSortOrder
	setSortOrder: (v: FlowGPTSortOrder) => void
	promptId?: string
	setPromptId: (v: string | undefined) => void
	prompt?: FlowgptPromptFull | undefined
	setPrompt: (v: FlowgptPromptFull | undefined) => void
}

export const createFlowGPTSlice: StoreSlice<FlowGPTState> = (setState) => ({
	sort: FlowGPTSortOrder.recommended,
	promptId: undefined,
	setPromptId: (v) => setState((state) => {state.promptId = v}),
	prompt: undefined,
	setPrompt: (v) => setState((state) => {state.prompt = v}),
	setSortOrder: (v) => setState((state) => {state.sort = v}),
})

/**
 * search for commands
 */
const searchQueue = new FixedCacheQueue(3)

export interface SearchState {
	history: string[]
	push: (v: string) => void
}

export const createSearchSlice: StoreSlice<SearchState> = (setState, getState, store) => ({
	history: [],
	push: (v: string) => setState((state) => {state.history = searchQueue.push(v)}),
})

/**
 * chats
 */

export interface ChatsState {
	history: string[]
	push: (v: string) => void
}

/**
 * store
 */
export type StoreState = UIState & SearchState & FlowGPTState

export type StoreSlice<T> = StateCreator<
	StoreState,
	[
		['zustand/devtools', never],
		['zustand/persist', unknown],
		['zustand/immer', never]
	],
	[],
	T>

export const useStore = create<StoreState>()(
	devtools(
		persist(
			immer(
				(...a) => ({
					...createUISlice(...a),
					...createSearchSlice(...a),
					...createFlowGPTSlice(...a),
				}),
			),
			{ name: 'zustand' },
		),
	),
)
