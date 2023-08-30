/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { $Enums, ChatMessageFormatType } from ".prisma/client"
import { PlatformType, PromptRoleType } from "@prisma/client"
import range from "lodash/range"
import { type AdapterUser } from "next-auth/adapters"

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
  STRIPE_PAYMENT_PRODUCT_10_ID,
  STRIPE_SUBSCRIBE_PRODUCT_10_ID,
  STRIPE_SUBSCRIBE_PRODUCT_30_ID,
  USER_INVITATIONS_COUNT,
} from "@/config"

import { getWelcomeSystemNotification } from "@/lib/string"

import StripeMode = $Enums.StripeMode

export const initSystem = async (prisma: ExtendedPrismaClient) => {
  const user = await prisma.user.upsert({
    where: { platform: { platformId: POKETTO_CREATOR_ID, platformType: PlatformType.Poketto } },
    update: {},
    create: {
      platformId: POKETTO_CREATOR_ID,
      platformType: PlatformType.Poketto,
      platformArgs: {
        uri: "",
      },
      email: POKETTO_CREATOR_EMAIL,
      description: POKETTO_CREATOR_DESC,
      name: POKETTO_CREATOR_NAME,
      image: POKETTO_CREATOR_AVATAR,
    },
  })

  // 不要nest在user里写，否则app删除后，就脱钩了
  await prisma.app.upsert({
    where: { platform: { platformId: POKETTO_APP_ID, platformType: "Poketto" } },
    update: {},
    include: {
      category: true,
      state: true,
    },
    create: {
      creator: {
        connect: {
          id: user.id,
        },
      },
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
  })

  await prisma.stripeProduct.upsert({
    where: { id: STRIPE_PAYMENT_PRODUCT_10_ID },
    update: {},
    create: {
      id: STRIPE_PAYMENT_PRODUCT_10_ID,
      price: 10,
      currency: "USD",
      mode: StripeMode.payment,
    },
  })
  await prisma.stripeProduct.upsert({
    where: { id: STRIPE_SUBSCRIBE_PRODUCT_10_ID },
    update: {},
    create: {
      id: STRIPE_SUBSCRIBE_PRODUCT_10_ID,
      price: 9.99,
      currency: "USD",
      mode: StripeMode.subscription,
      expire: 30,
      level: "premium",
    },
  })
  await prisma.stripeProduct.upsert({
    where: { id: STRIPE_SUBSCRIBE_PRODUCT_30_ID },
    update: {},
    create: {
      id: STRIPE_SUBSCRIBE_PRODUCT_30_ID,
      price: 29.99,
      currency: "USD",
      mode: StripeMode.subscription,
      expire: 30,
      level: "extreme",
    },
  })
  console.log("✅ Successfully initialized poketto system ~")
}

/**
 *
 * @param {ExtendedPrismaClient} prisma
 * @param {} user 注意是 next-auth 里 user
 */
export const initUser = async (prisma: ExtendedPrismaClient, user: Omit<AdapterUser, "id">) => {
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
      platformId: user.email ?? user.name,
      platformType: PlatformType.Poketto,
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
          data: range(USER_INVITATIONS_COUNT).map(() => ({})),
        },
      },
    },
  })

  console.log(`✅ Successfully created user(id=${createdUser.id}, name=${createdUser.name}) ~`)
  return createdUser
}
