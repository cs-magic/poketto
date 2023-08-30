/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { createTRPCRouter, publicProcedure } from "@/server/trpc.helpers"

import { FREE_GPT3_DAILY_TOTAL, FREE_GPT4_DAILY_TOTAL } from "@/config"

const status = {
  gpt3: {
    free: {
      surplus: FREE_GPT3_DAILY_TOTAL,
    },
  },
  gpt4: {
    free: {
      surplus: FREE_GPT4_DAILY_TOTAL,
    },
  },
}

export const systemRouter = createTRPCRouter({
  status: publicProcedure.query(async ({ ctx: { prisma } }) => {
    const apps = await prisma.app.count()
    const users = await prisma.user.count()
    const calls = ((await prisma.chatMessage.count()) / 2) * 15 + 2
    return {
      ...status,
      apps,
      users,
      calls,
    }
  }),
})
