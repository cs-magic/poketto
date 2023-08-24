/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { type Adapter as NextAuthAdapter, type AdapterUser } from "next-auth/adapters"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { type PrismaClient } from "@prisma/client"
import { prisma } from "@/server/db"
import { initUser } from "@/server/init"

const { createUser: prismaCreateUser, ...adapterExtra } = PrismaAdapter(prisma as unknown as PrismaClient)

export const pokettoPrismaAdapter: NextAuthAdapter = {
  /**
   * example user:
   image: "https://avatars.githubusercontent.com/u/33591398?v=4"
   platformId: "33591398"
   platformType: "Poketto"
   emailVerified: null
   */
  createUser: async (user) => {
    console.log("creating user: ", { user })
    // 有可能会重新插入！！！
    const existed = await prisma.user.findUnique({
      where: {
        platform: {
          platformId: user.platformId,
          platformType: user.platformType,
        },
      },
    })
    return (existed || await initUser(prisma, user)) as AdapterUser
  },
  ...adapterExtra,
}
