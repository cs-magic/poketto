import { z } from "zod"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/trpc.helpers"
import { ChatMessageWhereInputSchema, ChatMessageUncheckedCreateInputSchema } from "prisma/generated/zod"
import { PrismaVectorStore } from "langchain/vectorstores/prisma"
import { ChatMessage } from "@prisma/client"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { Prisma } from ".prisma/client"

export const msgRouter = createTRPCRouter({
  // the action of pushing is at the backend
  push: publicProcedure.input(ChatMessageUncheckedCreateInputSchema).mutation(async ({ ctx: { prisma }, input }) => {
    return prisma.chatMessage.create({ data: input })
  }),

  searchSimilar: publicProcedure
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
      const result = await vectorStore.similaritySearch(content, count)
      return result.map((x) => x.metadata)
    }),

  list: protectedProcedure.input(ChatMessageWhereInputSchema).query(
    async ({
      ctx: {
        prisma,
        session: { user },
      },
      input,
    }) => {
      // 不能只按照时间倒序排序，因为有些会相同，然后 id 会顺序，因为 msg 是基于 cuid 的，所以可以直接按照 id 逆序，已经包含时间
      return prisma.chatMessage.findMany({ where: input, orderBy: { id: "desc" }, take: 10 })
    }
  ),

  syncLatestId: protectedProcedure
    .input(z.object({ conversationId: z.string() }))
    .mutation(async ({ ctx: { prisma }, input: { conversationId } }) => {
      return (
        await prisma.chatMessage.findFirstOrThrow({
          take: -1,
          where: { conversationId },
        })
      ).id
    }),
})
