import { PlatformType, type User as PrismaUser } from ".prisma/client"
import { allowDangerousEmailAccountLinking } from "@/config"
import { env } from "@/env.mjs"
import { prisma } from "@/server/db"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { type PrismaClient } from "@prisma/client"
import { type GetServerSidePropsContext } from "next"
import { type DefaultSession, type DefaultUser, getServerSession, type NextAuthOptions } from "next-auth"
import { type Adapter as NextAuthAdapter, type AdapterUser } from "next-auth/adapters"
import DiscordProvider from "next-auth/providers/discord"
import GithubProvider from "next-auth/providers/github"
import { initUser } from "@/server/init"

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string
    }
  }

  // ref:
  // 1. https://next-auth.js.org/getting-started/typescript#popular-interfaces-to-augment
  // 2. next-auth/core/types.d.ts
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User extends DefaultUser {
    platformId: string
    platformType: PlatformType
  }
  /**
   * Usually contains information about the provider being used
   * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
   */
  // interface Account {}
  /** The OAuth profile returned from your provider */
  // interface Profile {}
}

const { createUser, ...adapterExtra } = PrismaAdapter(prisma as unknown as PrismaClient)

const adapter: NextAuthAdapter = {
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
    const existed = await prisma.user.findUnique({ where: { platform: { platformId: user.platformId, platformType: user.platformType } } })
    return (existed ? existed : await initUser(prisma, user)) as AdapterUser
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
    signIn: async (signInParams) => {
      console.log("signIn: ", signInParams) // 这个文件里，不要用 pino 之类的异步 log 函数，否则会导致 debug 困难
      const { user, profile } = signInParams
      user.platformId = user.id
      user.platformType = PlatformType.Poketto
      return true
    },

    session: async (sessionParams) => {
      // console.log("session: ", sessionParams)
      const { session, user } = sessionParams
      return {
        ...session,
        user,
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
