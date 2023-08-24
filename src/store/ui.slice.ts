/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { type StoreSlice } from '@/store/index'

/**
 * ui
 */
export enum CardsLayoutType {
	masonry = 'masonry',
	grid = 'grid',
}

export interface UIState {
	cardsLayout: CardsLayoutType
	setCardsLayout: (v: CardsLayoutType) => void
	
	sidebarVisible: boolean
	toggleSidebar: () => void
	
	chatListVisible: boolean
	toggleChatList: () => void
	
	chatDetailVisible: boolean
	toggleChatDetail: () => void
}

export const createUISlice: StoreSlice<UIState> = (setState, getState, store) => ({
	
	cardsLayout: CardsLayoutType.masonry,
	setCardsLayout: (v) => setState((state) => {state.cardsLayout = v}),
	
	sidebarVisible: true,
	toggleSidebar: () => setState((state) => {state.sidebarVisible = !state.sidebarVisible}),
	
	chatDetailVisible: true,
	toggleChatDetail: () => setState((state) => {state.chatDetailVisible = !state.chatDetailVisible}),
	
	chatListVisible: true,
	toggleChatList: () => setState((state) => {state.chatListVisible = !state.chatListVisible}),
})
