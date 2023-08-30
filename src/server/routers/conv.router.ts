/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Prisma } from ".prisma/client"
import { ChatMessageFormatType } from "@prisma/client"
import { ConversationWhereUniqueInputSchema } from "prisma/generated/zod"
import { z } from "zod"

import { createTRPCRouter, protectedProcedure } from "@/server/trpc-helpers"

import { includeConvForDetailView, selectAppForDetailView, selectConvForListView } from "@/ds"

import { getWelcomeSystemNotification } from "@/lib/string"

import ConversationWhereUniqueInput = Prisma.ConversationWhereUniqueInput

export const convRouter = createTRPCRouter({
  /**
   * todo: public with permission control
   */
  has: protectedProcedure.input(ConversationWhereUniqueInputSchema).query(
    async ({
      input,
      ctx: {
        prisma,
        session: { user },
      },
    }) => !!(await prisma.conversation.findUnique({ where: input }))
  ),

  add: protectedProcedure
    .input(
      z.object({
        appId: z.string(),
      })
    )
    .mutation(
      async ({
        ctx: {
          prisma,
          session: { user },
        },
        input: { appId },
      }) => {
        const userId = user.id
        console.log("adding app: ", { userId, appId })
        const app = await prisma.app.findUniqueOrThrow({ where: { id: appId }, select: selectAppForDetailView })
        const addedConv = await prisma.conversation.create({
          include: {
            messages: true,
          },
          data: {
            userId,
            appId,
            messages: {
              create: [
                {
                  role: "system",
                  content: getWelcomeSystemNotification(user.name ?? "bro"), // do not know app name here, lol
                  format: ChatMessageFormatType.systemNotification,
                },
                ...app.modelArgs.prompts,
              ].map((m) => ({ ...m, userId: user.id })), // !important
            },
          },
        })
        console.log(`added conv(id=${addedConv.id})`)
        return addedConv
      }
    ),

  list: protectedProcedure.query(
    async ({
      ctx: {
        prisma,
        session: { user },
      },
      input,
    }) =>
      prisma.conversation.findMany({
        select: selectConvForListView,
        where: { userId: user.id },
      })
  ),

  get: protectedProcedure.input(ConversationWhereUniqueInputSchema).query(
    async ({
      ctx: {
        prisma,
        session: { user },
      },
      input,
    }) =>
      prisma.conversation.findUnique({
        include: includeConvForDetailView,
        where: input,
      })
  ),

  pin: protectedProcedure
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

  del: protectedProcedure.input(ConversationWhereUniqueInputSchema).mutation(
    async ({
      ctx: {
        prisma,
        session: { user },
      },
      input,
    }) =>
      //   todo: validate in zod
      prisma.conversation.delete({ where: input })
  ),
})
