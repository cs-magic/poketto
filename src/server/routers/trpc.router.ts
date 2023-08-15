import { userRouter } from '@/server/routers/user.router'
import { createTRPCRouter } from '@/server/routers/trpc.helpers'
import { flowgptRouter } from '@/server/routers/flowgpt.router'
import { chatRouter } from '@/server/routers/chat.router'
import { pokettoRouter } from '@/server/routers/poketto.router'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	user: userRouter,
	flowgpt: flowgptRouter,
	chat: chatRouter,
	poketto: pokettoRouter,
})


// export type definition of API
export type AppRouter = typeof appRouter;
