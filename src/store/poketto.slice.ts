import { SortOrder } from '@/ds/system'
import { type IPokettoBasic, type IPokettoComment } from '@/ds/poketto'

import { type StoreSlice } from '@/store/index'

/**
 * poketto
 */
export interface PokettoState {
	sortOrder: SortOrder
	setSortOrder: (v: SortOrder) => void
	
	pokettoId?: string
	setPokettoId: (v: string | undefined) => void
	
	pokettoBasic?: IPokettoBasic
	setPokettoBasic: (v: IPokettoBasic | undefined) => void
	
	pokettoComments: IPokettoComment[]
	setPokettoComments: (v: IPokettoComment[]) => void
	pushPokettoComments: (v: IPokettoComment[]) => void
}

export const createPokettoSlice: StoreSlice<PokettoState> = (setState) => ({
	sortOrder: SortOrder.recommended,
	setSortOrder: (v) => setState((state) => {state.sortOrder = v}),
	
	pokettoId: undefined,
	setPokettoId: (v) => setState((state) => {state.pokettoId = v}),
	
	pokettoBasic: undefined,
	setPokettoBasic: (v) => setState((state) => {state.pokettoBasic = v}),
	
	pokettoComments: [],
	setPokettoComments: (v) => setState((state) => {state.pokettoComments = v}),
	pushPokettoComments: (v) => setState((state) => {state.pokettoComments.push(...v)}),
})
