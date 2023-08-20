import { z } from "zod"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/routers/trpc.helpers"
import { includeConvForDetailView, selectConvForListView } from "@/ds"
import { Prisma, PromptRoleType } from ".prisma/client"
import ConversationWhereUniqueInput = Prisma.ConversationWhereUniqueInput
import ConversationWhereUniqueInputSchema from "../../../prisma/generated/zod/inputTypeSchemas/ConversationWhereUniqueInputSchema"

export const conversationRouter = createTRPCRouter({
  /**
   * todo: public with permission control
   */
  hasApp: protectedProcedure.input(z.object({ appId: z.string() })).query(
    async ({
      input: { appId },
      ctx: {
        prisma,
        session: { user },
      },
    }) => {
      return !!(await prisma.conversation.findUnique({ where: { conversation: { userId: user.id, appId } } }))
    }
  ),

  getConversation: protectedProcedure.input(ConversationWhereUniqueInputSchema).query(
    async ({
      ctx: {
        prisma,
        session: { user },
      },
      input,
    }) => {
      return prisma.conversation.findUnique({
        include: includeConvForDetailView,
        where: input,
      })
    }
  ),

  listConversations: protectedProcedure.query(
    async ({
      ctx: {
        prisma,
        session: { user },
      },
      input,
    }) => {
      return prisma.conversation.findMany({
        select: selectConvForListView,
        where: { userId: user.id },
      })
    }
  ),

  listMessages: protectedProcedure.input(z.any()).query(
    async ({
      ctx: {
        prisma,
        session: { user },
      },
      input,
    }) => {
      return prisma.chatMessage.findMany({ where: input })
    }
  ),

  pinConv: protectedProcedure
    .input(
      z.object({
        conversationId: z.string(),
        toStatus: z.boolean(),
      })
    )
    .mutation(
      async ({
        ctx: {
          prisma,
          session: { user },
        },
        input: { conversationId, toStatus },
      }) => {
        await prisma.conversation.update({
          where: { id: conversationId },
          data: { pinned: toStatus },
        })
      }
    ),

  delConversation: protectedProcedure.input(z.any()).mutation(
    async ({
      ctx: {
        prisma,
        session: { user },
      },
      input,
    }) => {
      //   todo: validate in zod
      return prisma.conversation.delete({ where: input as unknown as ConversationWhereUniqueInput })
    }
  ),

  pushMessage: publicProcedure
    .input(
      z.object({
        conversationId: z.string(),
        content: z.string(),
        role: z.nativeEnum(PromptRoleType),
      })
    )
    .mutation(async ({ ctx: { prisma }, input }) => {
      return prisma.chatMessage.create({ data: input })
    }),
})
