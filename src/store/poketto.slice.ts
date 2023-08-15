import { type IAppMessage, type IConversation, type IAppComment, SortOrder, type AppWithRelation } from '@/ds/poketto'

import { type StoreSlice } from '@/store/index'
import { type ID } from '@/ds/general'
import { POKETTO_APP_ID, YourSolePoketto } from '@/config/poketto'
import { createApp } from '@/lib/poketto'

/**
 * poketto
 */
export interface PokettoState {
	sortOrder: SortOrder
	setSortOrder: (v: SortOrder) => void
	
	app: AppWithRelation
	setApp: (v: AppWithRelation) => void
	
	appComments: IAppComment[]
	setAppComments: (v: IAppComment[]) => void
	pushAppComments: (v: IAppComment[]) => void
	
	convId?: string
	setConvId: (v: string) => void
	
	appMessages: IAppMessage[]
	pushAppMessage: (v: IAppMessage) => void
}

export const createPokettoSlice: StoreSlice<PokettoState> = (setState) => ({
	sortOrder: SortOrder.recommended,
	setSortOrder: (v) => setState((state) => {state.sortOrder = v}),
	
	convId: undefined,
	setConvId: (v) => setState((state) => {state.convId = v}),
	
	app: YourSolePoketto,
	setApp: (v) => setState((state) => {
		state.app = v
		const app = state.pokettos.find((c) => c.app.id === v.id)
		if (app) app.app = v
	}),
	
	appComments: [],
	setAppComments: (v) => setState((state) => {state.appComments = v}),
	pushAppComments: (v) => setState((state) => {state.appComments.push(...v)}),
	
	appMessages: [],
	pushAppMessage: (v) => setState((state) => { state.appMessages.push(v)}),
})
