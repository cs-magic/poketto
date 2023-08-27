/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export const isNumber = (v: any): v is number => {
  if (v !== 0 && !v) {
    return false
  }
  if (v instanceof Date) {
    return false
  }
  if (Number(v) !== v) {
    return false
  }
  return true
}
export const vIsNumber = (a: [any, any]): a is [any, number] => isNumber(a[1])
