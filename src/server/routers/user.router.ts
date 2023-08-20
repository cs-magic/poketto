import { z } from "zod"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/trpc.helpers"
import { selectUserProfile, type UserForProfile } from "@/ds"

export const userRouter = createTRPCRouter({
  list: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({ select: selectUserProfile })
  }),

  getProfile: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query<UserForProfile>(async ({ ctx, input: { userId } }) => {
      return ctx.prisma.user.findUniqueOrThrow({ where: { id: userId }, select: selectUserProfile })
    }),
})
