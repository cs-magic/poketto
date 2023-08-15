import { type AppWithRelation, type ConversationWithRelation, type IAppComment, type IAppMessage, SortOrder } from '@/ds/poketto'

import { type StoreSlice } from '@/store/index'
import { YourSolePoketto } from '@/config/poketto'

/**
 * poketto
 */
export interface PokettoState {
	sortOrder: SortOrder
	setSortOrder: (v: SortOrder) => void
	
	app: AppWithRelation
	
	appComments: IAppComment[]
	setAppComments: (v: IAppComment[]) => void
	pushAppComments: (v: IAppComment[]) => void
	
	convId?: string
	setConvId: (v: string) => void
	
	convs: ConversationWithRelation[]
	setConvs: (v: ConversationWithRelation[]) => void
	
	appMessages: IAppMessage[]
	pushAppMessage: (v: IAppMessage) => void
}

export const createPokettoSlice: StoreSlice<PokettoState> = (setState) => ({
	sortOrder: SortOrder.recommended, setSortOrder: (v) => setState((state) => {state.sortOrder = v}),
	
	convId: undefined, setConvId: (v) => setState((state) => {state.convId = v}),
	
	convs: [], setConvs: (v) => setState((state) => {state.convs = v}),
	
	app: YourSolePoketto,
	
	appComments: [], setAppComments: (v) => setState((state) => {state.appComments = v}), pushAppComments: (v) => setState((state) => {state.appComments.push(...v)}),
	
	appMessages: [], pushAppMessage: (v) => setState((state) => { state.appMessages.push(v)}),
})
