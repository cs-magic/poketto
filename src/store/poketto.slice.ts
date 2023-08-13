import { SortOrder } from '@/ds/system'
import { type IPokettoBasic, type IPokettoChannel, type IPokettoComment } from '@/ds/poketto'

import { type StoreSlice } from '@/store/index'
import { type ID } from '@/ds/general'
import { POKETTO_CHANNEL_ID, pokettoBasic } from '@/config/poketto'
import { createPokettoChannel } from '@/lib/poketto'

/**
 * poketto
 */
export interface PokettoState {
	sortOrder: SortOrder
	setSortOrder: (v: SortOrder) => void
	
	pokettoId: ID
	setPokettoId: (v: ID) => void
	
	pokettoBasic: IPokettoBasic
	setPokettoBasic: (v: IPokettoBasic) => void
	
	pokettoComments: IPokettoComment[]
	setPokettoComments: (v: IPokettoComment[]) => void
	pushPokettoComments: (v: IPokettoComment[]) => void
	
	channels: IPokettoChannel[]
	addChannel: (pokettoChannel: IPokettoChannel) => void
	leaveChannel: (channelId: ID) => void
}

export const createPokettoSlice: StoreSlice<PokettoState> = (setState) => ({
	sortOrder: SortOrder.recommended,
	setSortOrder: (v) => setState((state) => {state.sortOrder = v}),
	
	pokettoId: POKETTO_CHANNEL_ID,
	setPokettoId: (v) => setState((state) => {state.pokettoId = v}),
	
	pokettoBasic,
	setPokettoBasic: (v) => setState((state) => {state.pokettoBasic = v}),
	
	pokettoComments: [],
	setPokettoComments: (v) => setState((state) => {state.pokettoComments = v}),
	pushPokettoComments: (v) => setState((state) => {state.pokettoComments.push(...v)}),
	
	channels: [createPokettoChannel(pokettoBasic)],
	addChannel: (v) => setState((state) => {state.channels.push(v)}),
	leaveChannel: (v) => setState((state) => {
		state.channels.splice(state.channels.findIndex((c) => c.poketto.id === v), 1)
	}),
})
