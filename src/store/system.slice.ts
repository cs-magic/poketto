/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { type StoreSlice } from "@/store/index"

import { MemoryMode, ModelType } from "@/ds"

import { FixedCacheQueue } from "@/lib/algo"

/**
 * system | search for commands
 */
const searchQueue = new FixedCacheQueue(3)

export interface SystemState {
  searchHistory: string[]
  pushSearch: (v: string) => void

  modelType: ModelType
  setModelType: (v: ModelType) => void

  memoryMode: MemoryMode
  setMemoryMode: (v: MemoryMode) => void
}

export const createSystemSlice: StoreSlice<SystemState> = (setState, getState, store) => ({
  searchHistory: [],
  pushSearch: (v: string) =>
    setState((state) => {
      state.searchHistory = searchQueue.push(v)
    }),

  modelType: "gpt-3.5-turbo",
  setModelType: (v) =>
    setState((state) => {
      state.modelType = v
    }),

  memoryMode: "one-time",
  setMemoryMode: (v) =>
    setState((state) => {
      state.memoryMode = v
    }),
})
