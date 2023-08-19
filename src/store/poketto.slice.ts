import { type StoreSlice } from "@/store/index"
import { type ConvForDetailView, type IAppComment, type IAppMessage, type SortOrder } from "@/ds"

/**
 * poketto
 */
export interface PokettoState {
  sortOrder: SortOrder
  setSortOrder: (v: SortOrder) => void

  appComments: IAppComment[]
  setAppComments: (v: IAppComment[]) => void
  pushAppComments: (v: IAppComment[]) => void

  convId?: string
  setConvId: (v: string) => void

  convs?: ConvForDetailView[]
  setConvs: (v: ConvForDetailView[] | undefined) => void

  appMessages: IAppMessage[]
  pushAppMessage: (v: IAppMessage) => void
}

export const createPokettoSlice: StoreSlice<PokettoState> = (setState) => ({
  sortOrder: "mostViewed",
  setSortOrder: (v) =>
    setState((state) => {
      state.sortOrder = v
    }),

  convId: undefined,
  setConvId: (v) =>
    setState((state) => {
      state.convId = v
    }),

  convs: undefined,
  setConvs: (v) =>
    setState((state) => {
      state.convs = v
    }),

  appComments: [],
  setAppComments: (v) =>
    setState((state) => {
      state.appComments = v
    }),
  pushAppComments: (v) =>
    setState((state) => {
      state.appComments.push(...v)
    }),

  appMessages: [],
  pushAppMessage: (v) =>
    setState((state) => {
      state.appMessages.push(v)
    }),
})
