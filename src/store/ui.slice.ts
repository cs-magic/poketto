/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { type StoreSlice } from "@/store/index"

import { CardsLayoutType } from "@/ds"

export interface UIState {
  cardsLayout: CardsLayoutType
  setCardsLayout: (v: CardsLayoutType) => void
}

export const createUISlice: StoreSlice<UIState> = (setState, getState, store) => ({
  cardsLayout: CardsLayoutType.masonry,
  setCardsLayout: (v) =>
    setState((state) => {
      state.cardsLayout = v
    }),
})
