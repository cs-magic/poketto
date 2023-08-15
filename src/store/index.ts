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
				version: 1.0,
				// @ts-ignore
				migrate: (persistedState: StoreState, version) => {
					if (version === .9) {
						// 大版本重构 (prisma)
						// @ts-ignore
						delete persistedState.app
						// @ts-ignore
						delete persistedState.apps
						// @ts-ignore
						delete persistedState.appComments
						// @ts-ignore
						delete persistedState.appMessages
					}
					if (version === .7) {
						// @ts-ignore
						delete persistedState.apps
					}
					if (version === .4) {
						// @ts-ignore
						delete persistedState.app.id
					}
					if ([.3, .5, .6].includes(version)) {
						// @ts-ignore
						delete persistedState.app
					}
					if (version === .2) {
						persistedState.apps[0]!.flowgpt.id = persistedState.app.id
					}
					if (version === .1) {
						const data = persistedState.apps[0]!.messages[0]!.content as unknown as { type: 'notification', content: string }
						persistedState.apps[0]!.messages[0] = { ...persistedState.apps[0]!.messages[0]!, ...data }
					}
					return persistedState
				},
			}),
	),
)
