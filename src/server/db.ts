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
import { initSystem } from "@/server/init"

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

  return c
}

export type ExtendedPrismaClient = ReturnType<typeof getExtendedClient>

const globalForDB = globalThis as unknown as {
  prisma?: ExtendedPrismaClient
  mongoLocal?: MongoClient
}
export const prisma = globalForDB.prisma ?? getExtendedClient()
export const mongoLocal = globalForDB.mongoLocal ?? new MongoClient(env.DB_MONGO_LOCAL_URI, {})

if (env.NODE_ENV !== "production") {
  globalForDB.prisma = prisma
  globalForDB.mongoLocal = mongoLocal
}
