/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Prisma } from ".prisma/client"
import { type ChatMessage } from "@prisma/client"
import { type CreateMessage } from "ai"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { PrismaVectorStore } from "langchain/vectorstores/prisma"
import sortedUniqBy from "lodash/sortedUniqBy"
import { ChatMessageUncheckedCreateInputSchema, ChatMessageWhereInputSchema } from "prisma/generated/zod"
import { use } from "sswr"
import { z } from "zod"

import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/trpc.helpers"

import { DEFAULT_LATEST_COUNT } from "@/config"

import { ModelQuota, ModelType, defaultModelQuota, selectChatMessageForDetailView } from "@/ds"

import UserUpdateArgs = Prisma.UserUpdateArgs

export const msgRouter = createTRPCRouter({
  // the action of pushing is at the backend
  push: publicProcedure.input(ChatMessageUncheckedCreateInputSchema).mutation(async ({ ctx: { prisma }, input }) => {
    const { user } = await prisma.conversation.findUniqueOrThrow({
      where: { id: input.conversationId },
      select: {
        user: true,
      },
    })

    // todo: token calculation
    const ourToken = input.content.length / 1000
    const { isUsingFree, role } = input
    const modelType = input.modelType as ModelType
    let { balance } = user
    const quota = user.quota ?? defaultModelQuota
    if (isUsingFree && role === "assistant") --quota[modelType]
    else --balance
    await prisma.user.update<UserUpdateArgs>({
      where: { id: user.id },
      data: {
        quota,
        balance,
      },
    })

    const vectorStore = PrismaVectorStore.withModel<ChatMessage>(prisma).create(new OpenAIEmbeddings(), {
      prisma: Prisma,
      tableName: "ChatMessage",
      vectorColumnName: "vector",
      columns: {
        id: PrismaVectorStore.IdColumn,
        content: PrismaVectorStore.ContentColumn,
        role: PrismaVectorStore.ContentColumn,
      },
    })
    const model = await prisma.chatMessage.create({ data: input })
    await vectorStore.addModels([model])
    return model
  }),

  getContext: publicProcedure
    .input(z.object({ conversationId: z.string(), content: z.string(), count: z.number().default(5) }))
    .query(async ({ ctx: { prisma }, input: { conversationId, content, count } }) => {
      const vectorStore = PrismaVectorStore.withModel<ChatMessage>(prisma).create(new OpenAIEmbeddings(), {
        prisma: Prisma,
        tableName: "ChatMessage",
        vectorColumnName: "vector",
        columns: {
          id: PrismaVectorStore.IdColumn,
          content: PrismaVectorStore.ContentColumn,
          role: PrismaVectorStore.ContentColumn,
        },
        filter: {
          conversationId: {
            equals: conversationId,
          },
        },
      })
      const similar = (await vectorStore.similaritySearch(content, count)).map((m) => m.metadata)
      const latest = await prisma.chatMessage.findMany({
        where: { conversationId },
        take: DEFAULT_LATEST_COUNT,
        orderBy: { id: "desc" },
      })
      // todo: max token control
      // lodash 不能在 edge 里使用
      return sortedUniqBy([...similar, ...latest.reverse()], "id") as CreateMessage[]
    }),

  list: protectedProcedure.input(ChatMessageWhereInputSchema).query(
    async ({
      ctx: {
        prisma,
        session: { user },
      },
      input,
    }) =>
      // 不能只按照时间倒序排序，因为有些会相同，然后 id 会顺序，因为 msg 是基于 cuid 的，所以可以直接按照 id 逆序，已经包含时间
      prisma.chatMessage.findMany({
        where: input,
        select: selectChatMessageForDetailView,
        orderBy: { id: "desc" },
        take: 10,
      })
  ),

  syncLatestId: protectedProcedure.input(z.object({ conversationId: z.string() })).mutation(
    async ({ ctx: { prisma }, input: { conversationId } }) =>
      (
        await prisma.chatMessage.findFirstOrThrow({
          take: -1,
          where: { conversationId },
        })
      ).id
  ),
})
