/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { convRouter } from "./routers/conv.router"
import { userRouter } from "@/server/routers/user.router"
import { createTRPCRouter } from "@/server/trpc.helpers"
import { pokettoAppRouter } from "@/server/routers/app.router"
import { msgRouter } from "@/server/routers/msg.router"
import { invitationRouter } from "@/server/routers/invitation.router"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const rootRouter = createTRPCRouter({
  user: userRouter,
  app: pokettoAppRouter,
  conv: convRouter,
  message: msgRouter,
  invitation: invitationRouter,
})

// export type definition of API
export type RootRouter = typeof rootRouter
