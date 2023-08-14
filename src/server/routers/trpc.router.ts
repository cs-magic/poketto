import { userRouter } from '@/server/routers/user.router'
import { createTRPCRouter } from '@/server/routers/trpc.helpers'
import { pokettoRouter } from '@/server/routers/poketto.router'
import { chatRouter } from '@/server/routers/chat.router'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	user: userRouter,
	poketto: pokettoRouter,
	chat: chatRouter,
})


// export type definition of API
export type AppRouter = typeof appRouter;
