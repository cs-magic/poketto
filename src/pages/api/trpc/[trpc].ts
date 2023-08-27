/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { createNextApiHandler } from "@trpc/server/adapters/next";



import { createTRPCContext } from "@/server/trpc.helpers";
// export API handler
import { rootRouter } from "@/server/trpc.router";



import { env } from "@/env.mjs";


// export API handler
export default createNextApiHandler({
  router: rootRouter,
  createContext: createTRPCContext,
  onError: ({ path, error }) => {
    if (env.NODE_ENV === "development") {
      console.error(`❌ tRPC failed on ${path ?? "<no-path>"}: [${error.message}]`)
      // toast.error(error.message) // 在这里 toast 是没用的
    }
    return error
  },
})