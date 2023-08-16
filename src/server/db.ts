import { MongoClient } from "mongodb"
import { env } from "@/env.mjs"
import { POKETTO_APP_WITH_RELATION } from "@/config"
import { PrismaClient } from ".prisma/client"
import { appInclude, AppWithRelation } from "@/ds"

const initPokettoApp = async (prisma: ExtendedPrismaClient, p: AppWithRelation) => {
  const { initPrompts, appId: appIdInModel, ...model } = p.model!
  const { creatorId, creator, state, categoryMain, categorySub, ...pp } = p
  const { appId: appIdInState, ...ss } = state!
  return prisma.app.upsert({
    include: appInclude,
    where: { id: p.id },
    update: {},
    create: {
      ...pp,
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
          where: { id: p.creatorId },
          create: creator,
        },
      },
      tags: {
        connectOrCreate: p.tags.map((t) => ({
          where: { id: t.id },
          create: t,
        })),
      },
      category: {
        connectOrCreate: {
          where: { id: { main: p.categoryMain, sub: p.categorySub } },
          create: {
            main: p.categoryMain,
            sub: p.categorySub,
          },
        },
      },
      actions: { create: [] },
      comments: {
        // todo
        create: [],
      },
      state: {
        connectOrCreate: {
          where: { id: p.id },
          create: ss,
        },
      },
    },
  })
}

function getExtendedClient() {
  const c = new PrismaClient({
    log:
      env.NODE_ENV === "development"
        ? [
            // 'query',
            "warn",
            "error",
          ]
        : ["error"],
  }).$extends({
    result: {
      user: {
        // todo: for-production-use index design
        impact: {
          needs: {
            name: true, // @ts-ignore
            followedBy: true, // 必须加上，否则没有数据
          }, // ref:
          compute: (user) => user.followedBy.length * 100 + (user.name ?? "").length,
        },
      },
    },
  })

  globalForDB.prisma = c

  void initPokettoApp(c, POKETTO_APP_WITH_RELATION)

  return c
}

export type ExtendedPrismaClient = ReturnType<typeof getExtendedClient>

const globalForDB = globalThis as unknown as {
  prisma: ExtendedPrismaClient | undefined
  mongo: MongoClient | undefined
}
export const prisma = globalForDB.prisma ?? getExtendedClient()
export const mongo = globalForDB.mongo ?? new MongoClient(env.DB_MONGO_URI, {})

if (env.NODE_ENV !== "production") {
  globalForDB.prisma = prisma
  globalForDB.mongo = mongo
}
