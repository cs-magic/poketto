import { create, type StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { FixedCacheQueue } from '@/lib/algo'


import { type IFlowgptPromptBasic, type FlowgptPromptFull, FlowGPTSortOrder } from '@/ds/flowgpt'
import { type SortOrder } from '@/ds/system'
import { type IPoketto } from '@/ds/poketto'

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
	chatListVisible: boolean
	toggleChatList: () => void
	chatDetailVisible: boolean
	toggleChatDetail: () => void
	sidebarVisible: boolean
	toggleSidebar: () => void
}

export const createUISlice: StoreSlice<UIState> = (setState, getState, store) => ({
	collapsed: false,
	cardsLayout: CardsLayoutType.masonry,
	switchCollapse: () => setState((state) => {state.collapsed = !state.collapsed}),
	setCardsLayout: (v) => setState((state) => {state.cardsLayout = v}),
	chatDetailVisible: true,
	toggleChatDetail: () => setState((state) => {state.chatDetailVisible = !state.chatDetailVisible}),
	chatListVisible: true,
	toggleChatList: () => setState((state) => {state.chatListVisible = !state.chatListVisible}),
	sidebarVisible: true,
	toggleSidebar: () => setState((state) => {state.sidebarVisible = !state.sidebarVisible}),
})

/**
 * flowgpt
 */
export interface PokettoState {
	sort: SortOrder
	setSortOrder: (v: SortOrder) => void
	pokettoId?: string
	setPokettoId: (v: string | undefined) => void
	poketto?: IPoketto | undefined
	setPoketto: (v: IPoketto | undefined) => void
}

export const createFlowGPTSlice: StoreSlice<PokettoState> = (setState) => ({
	sort: FlowGPTSortOrder.recommended,
	pokettoId: undefined,
	setPokettoId: (v) => setState((state) => {state.pokettoId = v}),
	poketto: undefined,
	setPoketto: (v) => setState((state) => {state.poketto = v}),
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
export type StoreState = UIState & SearchState & PokettoState

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
