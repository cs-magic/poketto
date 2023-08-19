import { PlatformType } from ".prisma/client"
import { TAG_SEPARATOR } from "@/config"
import { type AppForListView, type IFlowgptPromptBasic, includeConvForDetailView, selectAppForDetailView, sortOrders } from "@/ds"
import { transformFlowgptPrompt2ForListView as transFlowgptPrompt2AppWithRelation } from "@/lib/flowgpt"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/routers/trpc.helpers"
import { ChatMessageFormatType, PromptRoleType } from "@prisma/client"
import { z } from "zod"
import { getWelcomeSystemNotification } from "@/lib/string"

export const appRouter = createTRPCRouter({
  /**
   * todo: public with permission control
   */

  getApp: publicProcedure
    .input(
      z.object({
        appId: z.string(),
      })
    )
    .query(async ({ ctx: { prisma }, input: { appId } }) => {
      return prisma.app.findUniqueOrThrow({
        select: selectAppForDetailView,
        where: { id: appId },
      })
    }),

  listApps: publicProcedure
    .input(
      z.object({
        cursor: z.number().default(0), // offset pagination; todo: cursor pagination (when database is bigger)
        size: z.number().default(20),

        language: z.string().optional(),
        categoryId: z.number().optional(),
        subCategoryId: z.number().optional(),
        tags: z.string().optional(), // use | to space

        searchKey: z.string().optional(),

        sortOrder: z.enum(sortOrders).default("mostViewed"),
      })
    )
    .query<{ data: AppForListView[]; nextCursor: number | undefined }>(async ({ ctx: { mongoLocal }, input }) => {
      let query: Record<string, any> = {}
      if (input.language !== undefined) query.language = input.language
      if (input.categoryId !== undefined) query.categoryId = input.categoryId
      if (input.subCategoryId !== undefined) query.subCategoryId = input.subCategoryId
      if (input.tags !== undefined) query.tags = { $in: input.tags.split(TAG_SEPARATOR) }
      if (input.searchKey)
        query = {
          $and: [
            query,
            {
              $or: [
                { title: { $regex: input.searchKey } },
                { description: { $regex: input.searchKey } },
                { "User.name": { $regex: input.searchKey } },
              ],
            },
          ],
        }
      const sort: Record<string, 1 | -1> = input.sortOrder === "mostViewed" ? { views: -1 } : { views: -1 } // todo
      const docs = (await mongoLocal
        .db("flowgpt")
        .collection("basic")
        .find(query)
        .sort(sort)
        .skip(input.cursor)
        .limit(input.size)
        .toArray()) as unknown as IFlowgptPromptBasic[]

      return {
        data: docs.map(transFlowgptPrompt2AppWithRelation),
        nextCursor: docs.length < input.size ? undefined : ++input.cursor,
      }
    }),

  addAppIntoConversation: protectedProcedure
    .input(
      z.object({
        appId: z.string(),
        appPlatform: z.nativeEnum(PlatformType).default(PlatformType.Poketto),
      })
    )
    .mutation(
      async ({
        ctx: {
          prisma,
          mongoLocal,
          session: { user },
        },
        input: { appId, appPlatform },
      }) => {
        const p = (await mongoLocal.db("flowgpt").collection("basic").findOne({ id: appId })) as unknown as IFlowgptPromptBasic
        return prisma.conversation.create({
          include: includeConvForDetailView,
          data: {
            user: {
              connect: { id: user.id }, // 需要 user + app 同时指定！
            },
            app: {
              connectOrCreate: {
                where: { platform: { platformType: appPlatform, platformId: appId } },
                create: {
                  state: {
                    create: {
                      views: p.views,
                      calls: p.uses,
                      forks: 0,
                      tips: p.tip,
                      stars: p.saves,
                      shares: p.shares,
                    },
                  },
                  modelName: p.model,
                  modelArgs: {
                    temperature: p.temperature,
                    prompts: [
                      {
                        role: PromptRoleType.system,
                        content: p.initPrompt,
                      },
                    ],
                  },
                  platformType: PlatformType.FlowGPT,
                  platformId: p.id,
                  name: p.title,
                  avatar: p.thumbnailURL,
                  desc: p.description,
                  language: p.language ?? "en",
                  category: {
                    connectOrCreate: {
                      where: { id: { main: p.categoryId, sub: p.subCategoryId } },
                      create: {
                        main: p.categoryId,
                        sub: p.subCategoryId,
                      },
                    },
                  },
                  creator: {
                    connectOrCreate: {
                      where: {
                        platform: {
                          platformId: p.userId,
                          platformType: PlatformType.FlowGPT,
                        },
                      },
                      create: {
                        platformId: p.userId,
                        platformType: PlatformType.FlowGPT,
                        platformArgs: {
                          uri: p.User.uri,
                        },
                        name: p.User.name,
                        image: p.User.image,
                      },
                    },
                  },
                },
              },
            },
            messages: {
              createMany: {
                data: [
                  {
                    content: getWelcomeSystemNotification(user.name ?? "bro", p.title),
                    format: ChatMessageFormatType.systemNotification,
                  },
                  {
                    content: p.initPrompt,
                    role: PromptRoleType.system,
                  },
                ],
              },
            },
          },
        })
      }
    ),
})
