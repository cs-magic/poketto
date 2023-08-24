/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { z } from "zod"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/trpc.helpers"
import { selectUserProfile, type UserForProfile } from "@/ds"

export const userRouter = createTRPCRouter({
  list: publicProcedure.query(({ ctx }) => ctx.prisma.user.findMany({ select: selectUserProfile })),

  getProfile: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query<UserForProfile>(async ({ ctx, input: { userId } }) => ctx.prisma.user.findUniqueOrThrow({ where: { id: userId }, select: selectUserProfile })),
})
