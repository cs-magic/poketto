import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "@/server/routers/trpc.helpers"
import { conversationInclude, type ConversationWithRelation } from "@/ds"
import { ChatMessageFormatType, PromptRoleType } from ".prisma/client"

export const conversationRouter = createTRPCRouter({
  /**
   * todo: public with permission control
   */

  listConversations: protectedProcedure.input(z.object({})).query(
    async ({
      ctx: {
        prisma,
        session: { user },
      },
      input,
    }) => {
      const result = await prisma.conversation.findMany({
        where: { userId: user.id },
        include: conversationInclude,
      })
      return result as ConversationWithRelation[]
    }
  ),

  getConversation: protectedProcedure
    .input(
      z.object({
        cid: z.string(),
      })
    )
    .query(
      async ({
        ctx: {
          prisma,
          session: { user },
        },
        input: { cid },
      }) => {
        const result = await prisma.conversation.findUnique({
          where: { userId: user.id, id: cid },
          include: conversationInclude,
        })
        return result as ConversationWithRelation
      }
    ),

  listMessages: protectedProcedure
    .input(
      z.object({
        cid: z.string(),
      })
    )
    .query(
      async ({
        ctx: {
          prisma,
          session: { user },
        },
        input: { cid },
      }) => {
        const result = await prisma.chatMessage.findMany({
          where: { conversationId: cid },
        })
        return result
      }
    ),

  pinConv: protectedProcedure
    .input(
      z.object({
        cid: z.string(),
        toStatus: z.boolean(),
      })
    )
    .mutation(async ({ ctx: { prisma, session }, input: { cid, toStatus } }) => {
      const user = await prisma.conversation.update({
        where: { id: cid },
        data: { pinned: toStatus },
      })
    }),

  delConversation: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx: { prisma, session }, input: { id } }) => {
      return await prisma.conversation.delete({ where: { id } })
    }),

  pushMessage: protectedProcedure
    .input(
      z.object({
        content: z.string(),
        role: z.nativeEnum(PromptRoleType),
        cid: z.string(),
      })
    )
    .mutation(
      async ({
        ctx: {
          prisma,
          session: { user },
        },
        input: { cid, content, role },
      }) => {
        const result = await prisma.chatMessage.create({
          data: {
            conversationId: cid,
            content,
            role,
            userId: user.id,
            format: ChatMessageFormatType.text,
          },
        })
        await prisma.conversation.update({
          where: { id: cid },
          data: { updatedAt: new Date() },
        })
        return result
      }
    ),
})
