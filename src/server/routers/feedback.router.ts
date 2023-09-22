import { Simulate } from "react-dom/test-utils"

import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/trpc-helpers"

import { feedbackFormSchema } from "@/ds"


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
    },
  ),
})