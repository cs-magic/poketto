import { type ExtendedPrismaClient } from "@/server/db"
import {
  POKETTO_APP_AVATAR,
  POKETTO_APP_DESC,
  POKETTO_APP_ID,
  POKETTO_APP_LANGUAGE,
  POKETTO_APP_NAME,
  POKETTO_CATEGORY_MAIN,
  POKETTO_CATEGORY_SUB,
  POKETTO_CREATOR_AVATAR,
  POKETTO_CREATOR_DESC,
  POKETTO_CREATOR_EMAIL,
  POKETTO_CREATOR_ID,
  POKETTO_CREATOR_NAME,
  POKETTO_MODEL_NAME,
  POKETTO_SYSTEM_PROMPT,
  POKETTO_WELCOME_MESSAGE,
  USER_INVITATIONS_COUNT,
} from "@/config"
import log from "@/lib/log"
import { PlatformType, PromptRoleType } from "@prisma/client"
import { getWelcomeSystemNotification } from "@/lib/string"
import { ChatMessageFormatType, type User as PrismaUser } from ".prisma/client"
import _ from "lodash"
import { type AdapterUser } from "next-auth/adapters"

export const initSystem = async (prisma: ExtendedPrismaClient) => {
  const result = await prisma.user.upsert({
    where: { platform: { platformId: POKETTO_CREATOR_ID, platformType: PlatformType.Poketto } },
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
      platformId: POKETTO_CREATOR_ID,
      platformType: PlatformType.Poketto,
      platformArgs: {},
      email: POKETTO_CREATOR_EMAIL,
      description: POKETTO_CREATOR_DESC,
      name: POKETTO_CREATOR_NAME,
      image: POKETTO_CREATOR_AVATAR,
      createdApps: {
        create: [
          {
            name: POKETTO_APP_NAME,
            language: POKETTO_APP_LANGUAGE,
            avatar: POKETTO_APP_AVATAR,
            platformId: POKETTO_APP_ID,
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
  log.info("✅ Successfully initialized poketto system ~")
  return result
}

/**
 *
 * @param {ExtendedPrismaClient} prisma
 * @param {} user 注意是 next-auth 里 user
 */
export const initUser = async (prisma: ExtendedPrismaClient, user: Omit<AdapterUser, "id">) => {
  // note: 在创建用户之前先创建系统用户，因为是 upsert 的操作，所以可以保证不会出错
  await initSystem(prisma)

  const pokettoRealApp = await prisma.app.findUniqueOrThrow({
    where: { platform: { platformId: POKETTO_APP_ID, platformType: PlatformType.Poketto } },
  })

  const createdUser = await prisma.user.create({
    include: {
      conversations: {
        include: {
          messages: true,
        },
      },
      invitedFrom: true,
    },
    data: {
      ...user,
      conversations: {
        create: [
          {
            appId: pokettoRealApp.id,
            messages: {
              create: [
                {
                  content: getWelcomeSystemNotification(user.name ?? "bro", POKETTO_APP_NAME),
                  format: ChatMessageFormatType.systemNotification,
                },
                {
                  content: POKETTO_SYSTEM_PROMPT,
                  role: PromptRoleType.system,
                },
                {
                  content: POKETTO_WELCOME_MESSAGE,
                  role: PromptRoleType.assistant,
                },
              ],
            },
          },
        ],
      },
      invitedFrom: {
        createMany: {
          data: _.range(USER_INVITATIONS_COUNT).map(() => ({})),
        },
      },
    },
  })

  log.info(`✅ Successfully created user(id=${createdUser.id}, name=${createdUser.name}) ~`)
  return createdUser
}
