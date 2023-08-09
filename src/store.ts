import { create, type StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { FixedCacheQueue } from '@/utils/algo'
import { DataDimension } from '@/ds/flowgpt'

/**
 * ui
 */
export enum CardsLayoutType {
	grid = 'grid',
	masonry = 'masonry',
}

export interface UIState {
	collapsed: boolean
	switchCollapse: () => void
	cardsLayout: CardsLayoutType
	setCardsLayout: (v: CardsLayoutType) => void
}

export const createUISlice: StoreSlice<UIState> = (setState, getState, store) => ({
	collapsed: false,
	cardsLayout: CardsLayoutType.masonry,
	switchCollapse: () => setState((state) => {state.collapsed = !state.collapsed}),
	setCardsLayout: (v) => setState((state) => {state.cardsLayout = v}),
})

export interface FlowGPTState {
	rank: DataDimension
	setRank: (v: DataDimension) => void
}

export const createFlowgptSlice: StoreSlice<FlowGPTState> = (setState) => ({
	rank: DataDimension.views,
	setRank: (v) => setState((state) => {state.rank = v}),
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
					...createFlowgptSlice(...a),
				}),
			),
			{ name: 'zustand' },
		),
	),
)
