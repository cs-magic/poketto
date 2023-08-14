import { type IAppMessage, type IApp, type IAppComment, SortOrder, type AppWithRelation } from '@/ds/poketto'

import { type StoreSlice } from '@/store/index'
import { type ID } from '@/ds/general'
import { YourSolePoketto } from '@/config/poketto'
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
	
	apps: IApp[]
	addApp: (v: IApp) => void
	delApp: (v: ID) => void
	
	appMessages: IAppMessage[]
	pushAppMessage: (v: IAppMessage) => void
}

export const createPokettoSlice: StoreSlice<PokettoState> = (setState) => ({
	sortOrder: SortOrder.recommended,
	setSortOrder: (v) => setState((state) => {state.sortOrder = v}),
	
	app: YourSolePoketto,
	setApp: (v) => setState((state) => {
		state.app = v
		const app = state.apps.find((c) => c.poketto.id === v.id)
		if (app) app.poketto = v
	}),
	
	appComments: [],
	setAppComments: (v) => setState((state) => {state.appComments = v}),
	pushAppComments: (v) => setState((state) => {state.appComments.push(...v)}),
	
	apps: [createApp(YourSolePoketto)],
	addApp: (v) => setState((state) => {state.apps.push(v)}),
	delApp: (v) => setState((state) => {
		state.apps.splice(state.apps.findIndex((c) => c.poketto.id === v), 1)
	}),
	
	appMessages: [],
	pushAppMessage: (v) => setState((state) => { state.appMessages.push(v)}),
})
