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
