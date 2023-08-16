import { z } from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/routers/trpc.helpers'
import { type UserWithRelations, userWithRelationsInclude } from '@/ds'


export const userRouter = createTRPCRouter({
	listApps: protectedProcedure
		.input(z.object({
			action: z.string(),
		}))
		.query(async ({ ctx, input }) => {
			const { user } = ctx.session
			if (!user) return []
			const result = await ctx.prisma.appAction
				.findMany({ where: { userId: user.id, action: input.action }, include: { app: true } })
			return result.map((v) => v.app)
		}),
	
	getExactUser: protectedProcedure
		.input(z.string().optional())
		.query(async ({ ctx, input }): Promise<UserWithRelations | undefined> => {
			if (!input) return undefined
			const res = await ctx.prisma.user.findUnique({ where: { id: input }, include: userWithRelationsInclude }) as UserWithRelations | null
			return res || undefined
		}),
	
	getSecretMessage: protectedProcedure.query(() => {
		return 'you can now see this secret message!'
	}),
	
	getInvitations: protectedProcedure.query(async ({ ctx }) => {
		const user = ctx.session.user
		if (!user) return []
		return ctx.prisma.invitationRelation.findMany({
			where: { fromId: user.id },
		})
	}),
	
	getAllUser: publicProcedure.query(({ ctx }) => {
		return ctx.prisma.user.findMany({
			include: {
				followedBy: true,
			},
		})
	}),
	
})
