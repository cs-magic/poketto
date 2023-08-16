import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { type GetServerSidePropsContext } from "next"
import { type DefaultSession, getServerSession, type NextAuthOptions } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import GithubProvider from "next-auth/providers/github"
import { env } from "@/env.mjs"
import { prisma } from "@/server/db"
import { Conversation, type PrismaClient } from "@prisma/client"
import log from "@/lib/logger"
import _ from "lodash"
import { ChatMessageFormatType, PlatformType, PromptRoleType, type User } from ".prisma/client"
import { type Adapter } from "next-auth/adapters"
import { prompt2chatMessage } from "@/lib/prompt"
import { type AppWithRelation } from "@/ds"
import { allowDangerousEmailAccountLinking, POKETTO_APP_WITH_RELATION, POKETTO_WELCOME_MESSAGE, USER_INVITATIONS_COUNT } from "@/config"

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
    platformUserId: string
    platformType: PlatformType
  }
}

export const addAppIntoConversation = async (u: User, app: AppWithRelation): Promise<Conversation> => {
  const existed = await prisma.conversation.findFirst({
    where: {
      userId: u.id,
      appId: app.id,
    },
  })
  if (existed) return existed

  // init conversation
  const c = await prisma.conversation.create({
    data: {
      userId: u.id,
      appId: app.id,
    },
  })

  // init chatMessage
  await prisma.chatMessage.createMany({
    data: [
      {
        content: `Welcome ${u.name} to join the ${app.name}`,
        conversationId: c.id,
        format: ChatMessageFormatType.systemNotification,
      },
      ...(app.model?.initPrompts ?? []).map((p) => prompt2chatMessage(u, c.id, p)),
    ],
  })
  return c
}

const initUser = async (user: User) => {
  log.info(`initializing user(id=${user.id}, name=${user.name})`)
  const conversation = await addAppIntoConversation(user, POKETTO_APP_WITH_RELATION)
  // welcome message
  await prisma.chatMessage.create({
    data: {
      content: POKETTO_WELCOME_MESSAGE,
      conversationId: conversation.id,
      format: ChatMessageFormatType.text,
      role: PromptRoleType.assistant,
    },
  })

  // init invitation tickets
  await prisma.invitationRelation.createMany({
    data: _.range(USER_INVITATIONS_COUNT).map(() => ({ fromId: user.id })),
  })

  // finished initialization
  log.info(`initialized user(id=${user.id}, name=${user.name})`)
}

const { createUser, ...adapterExtra } = PrismaAdapter(prisma as unknown as PrismaClient)

const adapter: Adapter = {
  createUser: async (user) => {
    const createdUser = await createUser(user)

    // init extra relations when user created here
    await initUser(createdUser as unknown as User) // todo: avoid as ?

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
      user.platformUserId = user.id
      user.platformType = PlatformType.Poketto
      return true
    },

    session: async ({ session, user, newSession, trigger, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          platformUserId: user.id,
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
