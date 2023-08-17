import { z } from "zod"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/routers/trpc.helpers"
import { appInclude, type AppWithRelation, type IFlowgptPromptBasic, sortOrders } from "@/ds"
import {
  transFlowgptPrompt2App,
  transFlowgptPrompt2Model,
  transFlowgptPrompt2State,
  transFlowgptPrompt2Tags,
  transFlowgptUserBasic,
  transformFlowgptPrompt2AppWithRelation as transFlowgptPrompt2AppWithRelation,
} from "@/lib/flowgpt"
import { addAppIntoConversation } from "@/server/auth"
import { PlatformType } from ".prisma/client"
import { prisma } from "@/server/db"
import { TAG_SEPARATOR } from "@/config"

export const appRouter = createTRPCRouter({
  /**
   * todo: public with permission control
   */

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
    .query<{ data: AppWithRelation[]; nextCursor: number | undefined }>(async ({ ctx: { mongoLocal }, input }) => {
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
})

async function initFlowgptApp(appId: string): Promise<AppWithRelation> {
  const fetchFlowgptPrompt = async (appId: string): Promise<IFlowgptPromptBasic> => {
    const singleFetch = async <T>(props: { path: string; j: object }) => {
      // await sleep(3000)

      const input = encodeURI(JSON.stringify({ "0": props.j }))
      const url = `https://flowgpt.com/api/trpc/${props.path}?batch=1&input=${input}`
      console.log("[API] ", "fetching: ", url)
      const response = await fetch(url)
      // console.log('[API] ', 'response: ', response)
      const result = await response.json()
      // console.debug('[API] ', 'fetched: ', result)
      return result[0].result.data.json as T
    }
    return singleFetch<IFlowgptPromptBasic>({ path: "prompt.getById", j: { json: appId } })
  }

  const p = await fetchFlowgptPrompt(appId)
  // drop foreign keys for nested create/upsert
  const { creatorId, categoryMain, categorySub, ...app_ } = transFlowgptPrompt2App(p)
  const { appId: appIdInModel, ...model } = transFlowgptPrompt2Model(p)
  const { appId: appIdInState, ...state } = transFlowgptPrompt2State(p)
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
          create: transFlowgptUserBasic(p.User),
        },
      },
      tags: {
        connectOrCreate: transFlowgptPrompt2Tags(p).map((t) => ({
          where: { id: t.id },
          create: t,
        })),
      },
      category: {
        connectOrCreate: {
          where: { id: { main: p.categoryId, sub: p.subCategoryId } },
          create: {
            main: p.categoryId ?? -1,
            sub: p.subCategoryId ?? -1,
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
