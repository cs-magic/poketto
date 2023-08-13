import { exampleRouter } from '@/server/api/routers/example'
import { createTRPCRouter } from '@/server/api/helpers'
import { pokettoRouter } from '@/server/api/routers/pokettoRouter'
import { chatRouter } from '@/server/api/routers/chat'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	example: exampleRouter,
	poketto: pokettoRouter,
	chat: chatRouter,
})


// export type definition of API
export type AppRouter = typeof appRouter;
