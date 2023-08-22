import { PlatformType } from ".prisma/client"
import { allowDangerousEmailAccountLinking, URI } from "@/config-const"
import { env } from "@/env.mjs"
import { type GetServerSidePropsContext } from "next"
import EmailProvider from "next-auth/providers/email"

import DiscordProvider from "next-auth/providers/discord"
import GithubProvider from "next-auth/providers/github"

import { pokettoPrismaAdapter } from "@/lib/db"
import { getServerSession, NextAuthOptions, User as NextAuthUser } from "next-auth"
import { emailFrom, sendVerificationRequest } from "@/lib/email"

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: URI.user.auth.signIn,
  },
  session: {
    strategy: "jwt", // 要用 jwt 的策略，否则每次请求拿不到 token，邮箱验证也没法做
  },
  callbacks: {
    signIn: async (signInParams) => {
      const { user, email, profile, account, credentials } = signInParams
      console.log("signIn: ", { user, email, profile, account, credentials }) // 这个文件里，不要用 pino 之类的异步 log 函数，否则会导致 debug 困难
      user.platformId = user.id
      user.platformType = account?.provider ?? PlatformType.Poketto
      if (profile) {
        user.email = profile?.email
      }
      return true
    },

    // async jwt({ token, user }) {
    //   console.log("jwt: ", { token, user })
    //   const dbUser = await prisma.user.findUnique({
    //     where: {
    //       id: token.id as string,
    //     },
    //   })
    //
    //   if (!dbUser) {
    //     if (user) {
    //       token.id = user?.id
    //     }
    //     return token
    //   }
    //
    //   return {
    //     id: dbUser.id,
    //     name: dbUser.name,
    //     email: dbUser.email,
    //     picture: dbUser.image,
    //   }
    // },

    async session({ token, session }) {
      console.log("session: ", { token, session })
      if (token) {
        session.user.id = token.sub! // 不要 token.id 了，妈的
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
  }, // ref: https://github.com/nextauthjs/next-auth/issues/6078
  adapter: pokettoPrismaAdapter,
  providers: [
    EmailProvider({
      from: emailFrom,
      // 它之所以没有配置 server，是因为直接在 sendVerificationRequest 中完成邮箱的所有验证等操作了
      // 而我在本地初始化 aws 客户端，之所以不需要输入 credentials 信息，是因为我本地有 ~/.aws 配置文件
      sendVerificationRequest,
    }),
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking,
      profile(profile): NextAuthUser {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          // username: profile.login, // 不能多加字段
          email: profile.email,

          image: profile.avatar_url,
          platformId: profile.id.toString(),
          platformType: PlatformType.github,
        }
      },
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
