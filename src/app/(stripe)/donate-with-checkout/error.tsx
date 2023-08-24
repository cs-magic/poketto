/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use client"

export default function Error({ error }: { error: Error }) {
  return <h2>{error.message}</h2>
}
