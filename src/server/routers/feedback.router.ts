/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { UserWhereUniqueInputSchema } from "prisma/generated/zod"
import { Simulate } from "react-dom/test-utils"
import { z } from "zod"

import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/trpc-helpers"

import { type UserForProfile, feedbackFormSchema, selectUserProfile } from "@/ds"

import input = Simulate.input

export const feedbackRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx: { prisma } }) => {
    return prisma.feedback.findMany({})
  }),

  post: protectedProcedure.input(feedbackFormSchema).mutation(
    ({
      ctx: {
        prisma,
        session: { user },
      },
      input,
    }) => {
      return prisma.feedback.create({
        data: {
          ...input,
          userId: user.id,
        },
      })
    }
  ),
})
