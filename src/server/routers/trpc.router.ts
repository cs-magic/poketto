import { userRouter } from "@/server/routers/user.router"
import { createTRPCRouter } from "@/server/routers/trpc.helpers"
import { chatRouter } from "@/server/routers/chat.router"
import { appRouter } from "@/server/routers/app.router"
import { conversationRouter } from "./conversation.router"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const rootRouter = createTRPCRouter({
	user: userRouter,
	chat: chatRouter,
	app: appRouter,
	conv: conversationRouter,
})

// export type definition of API
export type AppRouter = typeof rootRouter
