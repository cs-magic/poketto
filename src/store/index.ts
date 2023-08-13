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
					...createUISlice(
						...a,
					),
					...createSystemSlice(
						...a,
					),
					...createPokettoSlice(
						...a,
					),
				}),
			),
			{
				name: 'zustand',
				version: 0.2,
				// @ts-ignore
				migrate: (persistedState: StoreState, version) => {
					if (version === 0.1) {
						const data = persistedState.channels[0]!.messages[0]!.content as unknown as { type: 'notification', content: string }
						persistedState.channels[0]!.messages[0] = { ...persistedState.channels[0]!.messages[0]!, ...data }
					}
					return persistedState
				},
			}),
	),
)
