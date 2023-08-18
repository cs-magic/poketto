import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "@/server/routers/trpc.helpers"
import { conversationInclude, type ConversationWithRelation } from "@/ds"
import { ChatMessageFormatType, PromptRoleType } from ".prisma/client"

export const conversationRouter = createTRPCRouter({
  /**
   * todo: public with permission control
   */

  listConversations: protectedProcedure.input(z.object({
  })).query(
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

  listMessages: protectedProcedure
    .input(
      z.object({
        appId: z.string(),
      })
    )
    .query(
      async ({
        ctx: {
          prisma,
          session: { user },
        },
        input: { appId },
      }) => {
        const result = await prisma.chatMessage.findMany({
          where: { conversationAppId: appId, conversationUserId: user.id }
        })
        return result
      }
    ),

  pinConv: protectedProcedure
    .input(
      z.object({
        appId: z.string(),
        toStatus: z.boolean(),
      })
    )
    .mutation(async ({ ctx: { prisma, session: { user } }, input: { appId, toStatus } }) => {
      await prisma.conversation.update({
        where: { id: { userId: user.id, appId } },
        data: { pinned: toStatus },
      })
    }),

  delConversation: protectedProcedure
    .input(
      z.object({
        appId: z.string(),
      })
    )
    .mutation(async ({ ctx: { prisma, session: { user } }, input: { appId } }) => {
      return await prisma.conversation.delete({ where: { id: { userId: user.id, appId } } })
    }),

  pushMessage: protectedProcedure
    .input(
      z.object({
        content: z.string(),
        role: z.nativeEnum(PromptRoleType),
        appId: z.string()
      })
    )
    .mutation(
      async ({
        ctx: {
          prisma,
          session: { user },
        },
        input: { appId, content, role },
      }) => {
        const result = await prisma.chatMessage.create({
          data: {
            conversationAppId: appId,
            conversationUserId: user.id,
            userId: user.id,
            content,
            role,
            format: ChatMessageFormatType.text,
          },
        })
        await prisma.conversation.update({
          where: { id: { appId: appId, userId: user.id } },
          data: { updatedAt: new Date() },
        })
        return result
      }
    ),
})
