import { DEFAULT_BATCH_CARDS, TAG_SEPARATOR } from "@/config"
import { selectAppForDetailView, selectAppForListView, sortOrders } from "@/ds"
import { createTRPCRouter, publicProcedure } from "@/server/trpc.helpers"
import { z } from "zod"

export const pokettoAppRouter = createTRPCRouter({
  /**
   * todo: public with permission control
   */

  list: publicProcedure
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
        take: limit + 1,

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

  get: publicProcedure
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
})
