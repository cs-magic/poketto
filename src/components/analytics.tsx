/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use client"

import { Analytics as VercelAnalytics } from "@vercel/analytics/react"

export function Analytics() {
  return <VercelAnalytics />
}
