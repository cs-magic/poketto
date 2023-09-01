/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface IClientReferenceId {
  userId: string
  origin: string
}

export const encodeClientReferenceId = (v: IClientReferenceId) => JSON.stringify(v)
export const decodeClientReferenceId = (v: string) => JSON.parse(v) as IClientReferenceId
