import { z } from "zod"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/routers/trpc.helpers"
import { selectUserProfile, type UserForProfile } from "@/ds"

export const userRouter = createTRPCRouter({
  getAllUser: publicProcedure.query(({ ctx }) => {
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

  getInvitations: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user
    if (!user) return []
    return ctx.prisma.invitationRelation.findMany({
      where: { fromId: user.id },
    })
  }),
})
