/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { createTRPCRouter, publicProcedure } from "@/server/trpc.helpers"

import { FREE_GPT3_DAILY, FREE_GPT4_DAILY } from "@/config"

const status = {
  gpt3: {
    free: {
      surplus: FREE_GPT3_DAILY,
    },
  },
  gpt4: {
    free: {
      surplus: FREE_GPT4_DAILY,
    },
  },
  users: 0,
  calls: 0,
}

export const systemRouter = createTRPCRouter({
  status: publicProcedure.query(({ ctx }) => status),
})
