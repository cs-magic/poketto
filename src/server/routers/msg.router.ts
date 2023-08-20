import { z } from "zod"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/trpc.helpers"
import { ChatMessageWhereInputSchema, ChatMessageUncheckedCreateInputSchema } from "prisma/generated/zod"

export const msgRouter = createTRPCRouter({
  // the action of pushing is at the backend
  push: publicProcedure.input(ChatMessageUncheckedCreateInputSchema).mutation(async ({ ctx: { prisma }, input }) => {
    return prisma.chatMessage.create({ data: input })
  }),

  list: protectedProcedure.input(ChatMessageWhereInputSchema).query(
    async ({
      ctx: {
        prisma,
        session: { user },
      },
      input,
    }) => {
      return prisma.chatMessage.findMany({ where: input, orderBy: { createdAt: "asc" }, take: -10 })
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
