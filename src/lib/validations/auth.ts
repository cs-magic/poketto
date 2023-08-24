/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as z from "zod"

export const userAuthSchema = z.object({
  email: z.string().email(),
})
