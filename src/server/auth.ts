import { ChatMessageFormatType, PlatformType, PromptRoleType } from ".prisma/client"
import {
  POKETTO_APP_ID,
  POKETTO_APP_NAME,
  POKETTO_SYSTEM_PROMPT,
  POKETTO_WELCOME_MESSAGE,
  USER_INVITATIONS_COUNT,
  allowDangerousEmailAccountLinking,
} from "@/config"
import { env } from "@/env.mjs"
import log from "@/lib/log"
import { prisma } from "@/server/db"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { type PrismaClient } from "@prisma/client"
import _ from "lodash"
import { type GetServerSidePropsContext } from "next"
import { getServerSession, type DefaultSession, type NextAuthOptions } from "next-auth"
import { type Adapter } from "next-auth/adapters"
import DiscordProvider from "next-auth/providers/discord"
import GithubProvider from "next-auth/providers/github"
import { getWelcomeSystemNotification } from "@/lib/string"
import { createMedium } from "use-sidecar"

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string // ...other properties
      // role: UserRole;
    }
  }

  interface User {
    // ...other properties
    // role: UserRole;
    platformId: string
    platformType: PlatformType
  }
}

const { createUser, ...adapterExtra } = PrismaAdapter(prisma as unknown as PrismaClient)

const adapter: Adapter = {
  /**
   * example user:
   image: "https://avatars.githubusercontent.com/u/33591398?v=4"
   platformId: "33591398"
   platformType: "Poketto"
   emailVerified: null
   */
  createUser: async (user) => {
    // note: 已经插入用户了！！！！！！
    const createdUser = await createUser(user)

    // 更新 conversation
    await prisma.conversation.create({
      include: {
        messages: true,
      },
      data: {
        appId: POKETTO_APP_ID,
        userId: createdUser.id,
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
    })
    // 更新 邀请码
    await prisma.invitationRelation.createMany({
      data: _.range(USER_INVITATIONS_COUNT).map(() => ({ fromId: createdUser.id })),
    })

    return createdUser
  },
  ...adapterExtra,
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    signIn: async ({ profile, user, email, account, credentials }) => {
      log.info({
        profile: profile,
        user: user,
        email: email,
        account: account,
        credentials: credentials,
      })
      user.platformId = user.id
      user.platformType = PlatformType.Poketto
      return true
    },

    session: async ({ session, user, newSession, trigger, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          platformId: user.id,
          platformType: PlatformType.Poketto,
        },
      }
    },
  }, // ref: https://github.com/nextauthjs/next-auth/issues/6078
  adapter,
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking,
    }),
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      allowDangerousEmailAccountLinking,
    }), // ref: https://next-auth.js.org/providers/google
    // GoogleProvider({
    // 	clientId: process.env.GOOGLE_ID,
    // 	clientSecret: process.env.GOOGLE_SECRET,
    // 	authorization: {
    // 		params: {
    // 			prompt: 'consent',
    // 			access_type: 'offline',
    // 			response_type: 'code',
    // 		},
    // 	},
    // }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: { req: GetServerSidePropsContext["req"]; res: GetServerSidePropsContext["res"] }) => {
  return getServerSession(ctx.req, ctx.res, authOptions)
}
