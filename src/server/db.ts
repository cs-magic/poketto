import { MongoClient } from "mongodb"
import { env } from "@/env.mjs"
import {
  POKETTO_APP_AVATAR,
  POKETTO_APP_DESC,
  POKETTO_APP_ID,
  POKETTO_APP_NAME,
  POKETTO_CATEGORY_MAIN,
  POKETTO_CATEGORY_SUB,
  POKETTO_CREATOR_AVATAR,
  POKETTO_CREATOR_DESC,
  POKETTO_CREATOR_EMAIL,
  POKETTO_CREATOR_ID,
  POKETTO_CREATOR_NAME,
  POKETTO_APP_LANGUAGE,
  POKETTO_MODEL_NAME,
  POKETTO_SYSTEM_PROMPT,
  POKETTO_WELCOME_MESSAGE,
} from "@/config"
import { PlatformType, PrismaClient } from ".prisma/client"
import log from "@/lib/log"
import { PromptRoleType } from "@prisma/client"

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
      conversation: {
        latestMessage: {
          needs: {
            // @ts-ignore
            messages: true,
          },
          compute: (conv) => conv.messages[conv.messages.length - 1],
        },
      },
    },
  })

  globalForDB.prisma = c

  c.user
    .upsert({
      where: { id: POKETTO_CREATOR_ID },
      include: {
        createdApps: {
          include: {
            category: true,
            state: true,
          },
        },
      },
      update: {},
      create: {
        id: POKETTO_CREATOR_ID, // 必须要加，因为是基于id比对的
        platformId: POKETTO_CREATOR_ID,
        platformType: PlatformType.Poketto,
        platformArgs: {},
        email: POKETTO_CREATOR_EMAIL,
        desc: POKETTO_CREATOR_DESC,
        name: POKETTO_CREATOR_NAME,
        image: POKETTO_CREATOR_AVATAR,
        createdApps: {
          create: [
            {
              id: POKETTO_APP_ID,
              name: POKETTO_APP_NAME,
              language: POKETTO_APP_LANGUAGE,
              avatar: POKETTO_APP_AVATAR,
              platformId: POKETTO_APP_AVATAR,
              platformType: PlatformType.Poketto,
              desc: POKETTO_APP_DESC,
              modelName: POKETTO_MODEL_NAME,
              modelArgs: {
                prompts: [
                  {
                    role: PromptRoleType.system,
                    content: POKETTO_SYSTEM_PROMPT,
                  },
                  {
                    role: PromptRoleType.assistant,
                    content: POKETTO_WELCOME_MESSAGE,
                  },
                ],
              },
              category: {
                connectOrCreate: {
                  where: { id: { main: POKETTO_CATEGORY_MAIN, sub: POKETTO_CATEGORY_SUB } },
                  create: { main: POKETTO_CATEGORY_MAIN, sub: POKETTO_CATEGORY_SUB },
                },
              },
              isOpenSource: false,
              state: {
                create: {
                  calls: 0,
                  forks: 0,
                  shares: 0,
                  stars: 0,
                  tips: 0,
                  views: 0,
                },
              },
            },
          ],
        },
      },
    })
    .then(() => {
      log.info("Successfully inited poketto ~")
    })
    .catch(console.error) //这里不能用pino，会报错

  return c
}

export type ExtendedPrismaClient = ReturnType<typeof getExtendedClient>

const globalForDB = globalThis as unknown as {
  prisma?: ExtendedPrismaClient
  mongo?: MongoClient
  mongoLocal?: MongoClient
}
export const prisma = globalForDB.prisma ?? getExtendedClient()
export const mongo = globalForDB.mongo ?? new MongoClient(env.DB_MONGO_URI, {})
export const mongoLocal = globalForDB.mongoLocal ?? new MongoClient(env.DB_MONGO_LOCAL_URI, {})

if (env.NODE_ENV !== "production") {
  globalForDB.prisma = prisma
  globalForDB.mongo = mongo
  globalForDB.mongoLocal = mongoLocal
}
