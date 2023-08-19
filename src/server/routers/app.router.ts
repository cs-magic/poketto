import { Prisma } from ".prisma/client"
import { DEFAULT_BATCH_CARDS, TAG_SEPARATOR } from "@/config"
import { selectAppForDetailView, selectAppForListView, sortOrders } from "@/ds"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/routers/trpc.helpers"
import { ChatMessageFormatType } from "@prisma/client"
import { z } from "zod"
import { getWelcomeSystemNotification } from "@/lib/string"
import ChatMessageCreateInput = Prisma.ChatMessageCreateInput

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
      console.log("finding app: ", { appId })
      return prisma.app.findUniqueOrThrow({
        select: selectAppForDetailView,
        where: { id: appId },
      })
    }),

  listApps: publicProcedure
    .input(
      z.object({
        cursor: z.string().nullish(), // offset pagination; todo: cursor pagination (when database is bigger)
        limit: z.number().default(DEFAULT_BATCH_CARDS),

        language: z.string().optional(),
        categoryMain: z.number().optional(),
        categorySub: z.number().optional(),
        tags: z.string().optional(), // use | to space
        searchKey: z.string().optional(),
        sortOrder: z.enum(sortOrders).default("mostViewed"),
      })
    )
    .query(async ({ ctx: { prisma }, input: { cursor, language, searchKey, limit, sortOrder, categoryMain, categorySub, tags } }) => {
      const items = await prisma.app.findMany({
        cursor: cursor ? { id: cursor } : undefined,
        take: DEFAULT_BATCH_CARDS + 1,

        select: selectAppForListView,
        where: {
          language,
          categoryMain,
          categorySub,
          tags: {
            every: {
              id: {
                in: tags?.split(TAG_SEPARATOR),
              },
            },
          },
          OR: [{ name: { contains: searchKey } }, { desc: { contains: searchKey } }, { creator: { name: { contains: searchKey } } }],
        },
        orderBy: {
          // todo: other sorts
          state: {
            views: "desc",
          },
        },
      })
      let nextCursor: typeof cursor | undefined = undefined
      if (items.length > limit) {
        const nextItem = items.pop()
        nextCursor = nextItem!.id
      }
      return {
        items,
        nextCursor,
      }
    }),

  addAppIntoConversation: protectedProcedure
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
        return prisma.conversation.create({
          include: {
            messages: true,
          },
          data: {
            userId,
            appId,
            messages: {
              createMany: {
                data: [
                  {
                    content: getWelcomeSystemNotification(user.name ?? "bro"), // do not know app name here, lol
                    format: ChatMessageFormatType.systemNotification,
                  },
                  ...(app.modelArgs as { prompts: ChatMessageCreateInput[] }).prompts,
                ],
              },
            },
          },
        })
      }
    ),
})
