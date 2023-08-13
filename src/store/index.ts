import { createUISlice, type UIState } from '@/store/ui.slice'
import { createSystemSlice, type SystemState } from '@/store/system.slice'
import { createPokettoSlice, type PokettoState } from '@/store/poketto.slice'
import { create, type StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

/**
 * store
 */
export type StoreState = UIState & SystemState & PokettoState

export type StoreSlice<T> = StateCreator<
	StoreState,
	[
		['zustand/devtools', never],
		['zustand/persist', unknown],
		['zustand/immer', never]
	],
	[],
	T>

export const useAppStore = create<StoreState>()(
	devtools(
		persist(
			immer(
				(...a) => ({
					...createUISlice(...a),
					...createSystemSlice(...a),
					...createPokettoSlice(...a),
				}),
			),
			{ name: 'zustand' }),
	),
)
