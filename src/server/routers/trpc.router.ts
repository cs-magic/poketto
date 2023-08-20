import { userRouter } from "@/server/routers/user.router"
import { createTRPCRouter } from "@/server/routers/trpc.helpers"
import { pokettoAppRouter } from "@/server/routers/poketto-app.router"
import { conversationRouter } from "./conversation.router"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  app: pokettoAppRouter,
  conv: conversationRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
