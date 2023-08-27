/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { UserWhereUniqueInputSchema } from "prisma/generated/zod"
import { z } from "zod"

import { createTRPCRouter, publicProcedure } from "@/server/trpc.helpers"

import { type UserForProfile, selectUserProfile } from "@/ds"

export const userRouter = createTRPCRouter({
  list: publicProcedure.query(({ ctx }) => ctx.prisma.user.findMany({ select: selectUserProfile })),

  getProfile: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query<UserForProfile>(async ({ ctx: { prisma }, input: { userId } }) =>
      prisma.user.findUniqueOrThrow({ where: { id: userId }, select: selectUserProfile })
    ),

  validateBalance: publicProcedure.input(UserWhereUniqueInputSchema).query(async ({ ctx: { prisma }, input }) => {
    const { balance } = await prisma.user.findUniqueOrThrow({ where: input })
    return balance > 0
  }),
})
