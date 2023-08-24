/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { create, type StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { createUISlice, type UIState } from '@/store/ui.slice'
import { createSystemSlice, type SystemState } from '@/store/system.slice'
import { createPokettoSlice, type PokettoState } from '@/store/poketto.slice'

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
						delete persistedState.pokettos
						// @ts-ignore
						delete persistedState.appComments
						// @ts-ignore
						delete persistedState.appMessages
					}
					return persistedState
				},
			}),
	),
)
