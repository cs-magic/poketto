import { create, type StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { FixedCacheQueue } from '@/utils/algo'

/**
 * ui
 */
export interface UIState {
	collapsed: boolean
	switchCollapse: () => void
}

export const createUISlice: StoreSlice<UIState> = (setState, getState, store) => ({
	collapsed: false,
	switchCollapse: () => setState((state) => {state.collapsed = !state.collapsed}),
})

/**
 * search for commands
 */
const searchQueue = new FixedCacheQueue(3)
console.log({ searchQueue })

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
export type StoreState = UIState & SearchState

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
				}),
			),
			{ name: 'zustand' },
		),
	),
)
