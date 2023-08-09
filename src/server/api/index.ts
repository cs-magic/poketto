import { exampleRouter } from '@/server/api/routers/example'
import { createTRPCRouter } from '@/server/api/helpers'
import { flowgptRouter } from '@/server/api/routers/flowgpt.router'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	example: exampleRouter,
	flowgpt: flowgptRouter,
})


// export type definition of API
export type AppRouter = typeof appRouter;
