import { createNextApiHandler } from "@trpc/server/adapters/next"

// export API handler
import { rootRouter } from "@/server/routers/_root.router"
import { createTRPCContext } from "@/server/trpc-helpers"

import { baseEnv } from "@/env.mjs"

export default createNextApiHandler({
  router: rootRouter,
  createContext: createTRPCContext,
  onError: ({ path, error }) => {
    if (baseEnv.NODE_ENV === "development") {
      console.error(`❌ tRPC failed on ${path ?? "<no-path>"}: [${error.message}]`)
      // toast.error(error.message) // 在这里 toast 是没用的
    }
    return error
  },
})
