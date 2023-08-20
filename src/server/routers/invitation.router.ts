import { createTRPCRouter, protectedProcedure } from "@/server/trpc.helpers"
import { Prisma } from ".prisma/client"

export const invitationRouter = createTRPCRouter({
  list: protectedProcedure.query(
    async ({
      ctx: {
        prisma,
        session: { user },
      },
    }) => {
      return prisma.invitationRelation.findMany({ where: { fromId: user.id } })
    }
  ),
})
