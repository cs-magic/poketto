import { type StoreSlice } from '@/store/root'

export interface UIState {
	collapsed: boolean
	switchCollapse: () => void
}

export const createUISlice: StoreSlice<UIState> = (setState, getState, store) => ({
	collapsed: false,
	switchCollapse: () => setState((state) => {state.collapsed = !state.collapsed}),
})
