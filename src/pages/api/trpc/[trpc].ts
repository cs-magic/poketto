import { createNextApiHandler } from "@trpc/server/adapters/next"
import { env } from "@/env.mjs"
import { appRouter } from "@/server/routers/trpc.router"
import { createTRPCContext } from "@/server/routers/trpc.helpers"
import { toast } from "sonner"

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError: ({ path, error }) => {
    if (env.NODE_ENV === "development") {
      console.error(`❌ tRPC failed on ${path ?? "<no-path>"}: [${error.message}]`)
      // toast.error(error.message) // 在这里 toast 是没用的
    }
    return error
  },
})
