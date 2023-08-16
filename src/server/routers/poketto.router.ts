import { z } from "zod"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/routers/trpc.helpers"
import partialSearch from "../../data/partial-search.agg.json"
import { appInclude, type AppWithRelation, conversationInclude, type ConversationWithRelation, type IFlowgptPromptBasic } from "@/ds"
import {
  transFlowgptPrompt2app,
  transFlowgptPrompt2creator,
  transFlowgptPrompt2model,
  transFlowgptPrompt2state,
  transFlowgptPrompt2tags,
  transformFlowgptPrompt2AppWithRelation as transFlowgptPrompt2AppWithRelation,
} from "@/lib/flowgpt"
import { addAppIntoConversation } from "@/server/auth"
import { fetchFlowgptPrompt } from "@/server/routers/flowgpt.router"
import { ChatMessageFormatType, PlatformType, PromptRoleType } from ".prisma/client"
import { prisma } from "@/server/db"

export const initFlowgptApp = async (appId: string): Promise<AppWithRelation> => {
  const p = await fetchFlowgptPrompt(appId)
  // drop foreign keys for nested create/upsert
  const { creatorId, categoryMain, categorySub, ...app_ } = transFlowgptPrompt2app(p)
  const { appId: appIdInModel, ...model } = transFlowgptPrompt2model(p)
  const { appId: appIdInState, ...state } = transFlowgptPrompt2state(p)
  return prisma.app.upsert({
    include: appInclude,
    where: { id: p.id },
    update: {},
    create: {
      ...app_,
      model: {
        create: {
          ...model,
          initPrompts: {
            create: [],
          },
        },
      },
      creator: {
        connectOrCreate: {
          where: { id: p.userId },
          create: transFlowgptPrompt2creator(p),
        },
      },
      tags: {
        connectOrCreate: transFlowgptPrompt2tags(p).map((t) => ({
          where: { id: t.id },
          create: t,
        })),
      },
      category: {
        connectOrCreate: {
          where: { id: { main: p.categoryId, sub: p.subCategoryId } },
          create: {
            main: p.categoryId,
            sub: p.subCategoryId,
          },
        },
      },
      actions: { create: [] },
      comments: {
        // todo
        create: [],
      },
      state: {
        create: {
          ...state,
        },
      },
    },
  })
}

export const pokettoRouter = createTRPCRouter({
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
        return result
      }
    ),

  addAppIntoConversation: protectedProcedure
    .input(
      z.object({
        appId: z.string(),
        appPlatform: z.nativeEnum(PlatformType).default(PlatformType.Poketto),
      })
    )
    .mutation(async ({ ctx: { prisma, session }, input: { appId, appPlatform } }) => {
      const user = await prisma.user.findUniqueOrThrow({
        where: { id: session.user.id },
      })

      const app =
        appPlatform === PlatformType.FlowGPT
          ? await prisma.app.findUniqueOrThrow({
              where: { id: appId },
              include: appInclude,
            })
          : await initFlowgptApp(appId)
      return addAppIntoConversation(user, app)
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

  searchPoketto: publicProcedure
    .input(
      z.object({
        query: z.string(),
        language: z.string().default("zh"),
        threshold: z.number().default(0.8),
        hideNsfw: z.boolean().default(true),
      })
    )
    .query<AppWithRelation[]>(async (opts) => {
      partialSearch[0]!.$search!.phrase.query = opts.input.query // <-- mongodb partial search
      let result
      result = await opts.ctx.mongo.db("flowgpt").collection("basic").aggregate<IFlowgptPromptBasic>(partialSearch).toArray()
      // result = await singleFetch<FlowgptPromptBasic[]>({ path: 'prompt.searchPrompts', { json: opts.input } })
      return result.map(transFlowgptPrompt2AppWithRelation)
    }),
})
