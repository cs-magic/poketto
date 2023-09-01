/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export class FixedCacheQueue<T = string> {
  public capacity: number
  public values: T[] = [] // todo: immer this instead of using slice

  constructor(size?: number) {
    this.capacity = size ?? 3
  }

  public push(v: T) {
    const index = this.values.findIndex((item) => item === v)
    this.values =
      index >= 0 ? [v, ...this.values.slice(0, index), ...this.values.slice(index + 1)] : [v, ...this.values].slice(0, this.capacity)
    return this.values
  }
}
