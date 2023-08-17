import { createNextApiHandler } from "@trpc/server/adapters/next"
import { env } from "@/env.mjs"
import { rootRouter } from "@/server/routers/trpc.router"
import { createTRPCContext } from "@/server/routers/trpc.helpers"

// export API handler
export default createNextApiHandler({
  router: rootRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(`❌ tRPC failed on ${path ?? "<no-path>"}: [${error.message}]`)
          // console.error(error)
        }
      : undefined,
})
