import { type IChannelMessage, type IPokettoBasic, type IPokettoChannel, type IPokettoComment, SortOrder } from '@/ds/poketto'

import { type StoreSlice } from '@/store/index'
import { type ID } from '@/ds/general'
import { pokettoBasic } from '@/config/poketto'
import { createChannel } from '@/lib/poketto'

/**
 * poketto
 */
export interface PokettoState {
	sortOrder: SortOrder
	setSortOrder: (v: SortOrder) => void
	
	pokettoBasic: IPokettoBasic
	setPokettoBasic: (v: IPokettoBasic) => void
	
	pokettoComments: IPokettoComment[]
	setPokettoComments: (v: IPokettoComment[]) => void
	pushPokettoComments: (v: IPokettoComment[]) => void
	
	channels: IPokettoChannel[]
	addChannel: (pokettoChannel: IPokettoChannel) => void
	delChannel: (channelId: ID) => void
	
	messages: IChannelMessage[]
	pushMessage: (v: IChannelMessage) => void
}

export const createPokettoSlice: StoreSlice<PokettoState> = (setState) => ({
	sortOrder: SortOrder.recommended,
	setSortOrder: (v) => setState((state) => {state.sortOrder = v}),
	
	pokettoBasic,
	setPokettoBasic: (v) => setState((state) => {
		state.pokettoBasic = v
		const channel = state.channels.find((c) => c.poketto.id === v.id)
		if (channel) channel.poketto = v
	}),
	
	pokettoComments: [],
	setPokettoComments: (v) => setState((state) => {state.pokettoComments = v}),
	pushPokettoComments: (v) => setState((state) => {state.pokettoComments.push(...v)}),
	
	channels: [createChannel(pokettoBasic)],
	addChannel: (v) => setState((state) => {state.channels.push(v)}),
	delChannel: (v) => setState((state) => {
		state.channels.splice(state.channels.findIndex((c) => c.poketto.id === v), 1)
	}),
	
	messages: [],
	pushMessage: (v) => setState((state) => { state.messages.push(v)}),
})
