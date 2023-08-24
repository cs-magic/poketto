/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { type StoreSlice } from "@/store/index"
import { type SortOrder } from "@/ds"

/**
 * poketto
 */
export interface PokettoState {
  sortOrder: SortOrder
  setSortOrder: (v: SortOrder) => void
}

export const createPokettoSlice: StoreSlice<PokettoState> = (setState) => ({
  sortOrder: "mostViewed",
  setSortOrder: (v) =>
    setState((state) => {
      state.sortOrder = v
    }),
})
