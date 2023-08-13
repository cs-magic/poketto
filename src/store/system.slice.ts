import { FixedCacheQueue } from '@/lib/algo'

import { type StoreSlice } from '@/store/index'

/**
 * system | search for commands
 */
const searchQueue = new FixedCacheQueue(3)

export interface SystemState {
	searchHistory: string[]
	pushSearch: (v: string) => void
}

export const createSystemSlice: StoreSlice<SystemState> = (setState, getState, store) => ({
	searchHistory: [],
	pushSearch: (v: string) => setState((state) => {state.searchHistory = searchQueue.push(v)}),
})
